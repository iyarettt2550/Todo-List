import { PrismaClient } from "@prisma/client";
// สร้าง client ไว้ตัวเดียวแล้วใช้ร่วมกันทั้งแอป
export const prisma = new PrismaClient();