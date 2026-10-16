import { Router } from "express";
import { prisma } from "../db";
import { createTodoSchema, idParamSchema, statusQuerySchema, updateTodoSchema } from "../schemas";
import { HttpError } from "../errors";

export const todosRouter = Router();

async function ensureExists(id: number): Promise<void> {
  const found = await prisma.todo.findUnique({ where: { id } });
  if (!found) throw new HttpError(404, "todo not found");
}

todosRouter.get("/", async (req, res) => {
  const status = statusQuerySchema.parse(req.query.status); // ไม่ส่งมา = "all"
  const where = status === "all" ? {} : { done: status === "done" };
  const todos = await prisma.todo.findMany({ where, orderBy: { createdAt: "desc" } });
  res.json(todos);
});

todosRouter.post("/", async (req, res) => {
  const { title } = createTodoSchema.parse(req.body); // ไม่ผ่านจะ throw ไปที่ errorHandler
  const todo = await prisma.todo.create({ data: { title } });
  res.status(201).json(todo);
});

todosRouter.patch("/:id", async (req, res) => {
  const id = idParamSchema.parse(req.params.id);
  const data = updateTodoSchema.parse(req.body);
  await ensureExists(id);
  const todo = await prisma.todo.update({ where: { id }, data });
  res.json(todo);
});

todosRouter.delete("/:id", async (req, res) => {
  const id = idParamSchema.parse(req.params.id);
  await ensureExists(id);
  await prisma.todo.delete({ where: { id } });
  res.status(204).end();
});