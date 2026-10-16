import express from "express";
import { errorHandler } from "./errors";
import { todosRouter } from "./routes/todos";

const app = express();
app.use(express.json()); // แปลง body ที่เป็น JSON ให้อยู่ใน req.body

app.get("/api/health", (_req, res) => {
  res.json({ "hello": 123 });
});

app.listen(3000, () => console.log("API on http://localhost:3000"));
app.use(errorHandler);
app.use("/api/todos", todosRouter);
app.use(errorHandler);