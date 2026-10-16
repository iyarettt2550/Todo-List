import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.todo.deleteMany(); // ล้างของเก่าก่อน จะได้รันซ้ำได้
  await prisma.todo.createMany({
    data: [
      { title: "อ่านเอกสาร Prisma", done: true },
      { title: "เขียน API GET /todos" },
      { title: "ทำหน้า list" },
    ],
  });
}
main().finally(() => prisma.$disconnect());