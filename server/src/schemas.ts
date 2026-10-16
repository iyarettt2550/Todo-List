// server/src/schemas.ts
import { z } from "zod";

const title = z.string().trim().min(1).max(200);

export const createTodoSchema = z.object({ title });

export const updateTodoSchema = z
  .object({ title: title.optional(), done: z.boolean().optional() })
  .refine((v) => v.title !== undefined || v.done !== undefined, {
    message: "at least one field is required",
  });

// "5" -> 5, "abc" -> ไม่ผ่าน
export const idParamSchema = z.coerce.number().int().positive();

export const statusQuerySchema = z.enum(["all", "active", "done"]).default("all");