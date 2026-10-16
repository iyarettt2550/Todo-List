import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

// ใช้ throw เมื่ออยากตอบ status เฉพาะ เช่น 404
export class HttpError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
  }
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({ error: "invalid input", details: err.issues });
    return;
  }
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
    return;
  }
  if (err instanceof SyntaxError) {
    // body เป็น JSON ที่พัง
    res.status(400).json({ error: "invalid JSON" });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "internal server error" });
};