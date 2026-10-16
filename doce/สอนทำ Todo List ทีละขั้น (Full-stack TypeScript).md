# สอนทำ Todo List ทีละขั้น (Full-stack TypeScript)

Oct 14, 2026 · @Plakon.kt

## วิธีใช้เอกสารนี้

ทำ Task 0 ถึง 10 ไปตามลำดับ แต่ละ Task เล็กพอจะทำเสร็จในครั้งเดียว และจบแล้วจะได้ของที่รันดูผลได้จริงทุกครั้ง ทำครบแล้วจะได้เว็บ Todo List ที่เพิ่ม ดู ติ๊กเสร็จ ลบ และกรองงานได้ โดยข้อมูลเก็บใน DB จริง

ทุก Task ใช้รูปแบบเดียวกัน:

- **เป้าหมาย:** จบ Task แล้วจะได้อะไร
- **ทำไม:** แนวคิดที่ต้องเข้าใจ
- **ลงมือ:** คำสั่งและโค้ด (path ไฟล์อยู่บรรทัดแรกของโค้ดทุกก้อน)
- **เช็คว่าผ่าน:** ทดสอบตามนี้ให้ผ่านทุกข้อก่อนไป Task ถัดไป

สเปกเต็มของระบบ (schema, API, หน้าจอ) อยู่ใน [Todo List — Spec โปรเจกต์ฝึก Full-stack](https://claude.ai/code/artifact/89e0ae97-bbc2-4245-b6f5-06836920605f)

| Task | ได้อะไร | เวลาโดยประมาณ |
| --- | --- | --- |
| 0 | เครื่องพร้อม | 30 นาที |
| 1 | Server ตอบ `/api/health` | 30 นาที |
| 2 | ตาราง `todos` + ข้อมูลตัวอย่าง | 30 นาที |
| 3 | Zod schema + error handler | 30 นาที |
| 4 | `GET` และ `POST /api/todos` | 45 นาที |
| 5 | `PATCH` และ `DELETE /api/todos/:id` | 45 นาที |
| 6 | โปรเจกต์ React + ชั้นเรียก API | 30 นาที |
| 7 | หน้าเว็บแสดงรายการงาน | 45 นาที |
| 8 | ฟอร์มเพิ่มงาน | 45 นาที |
| 9 | ติ๊กเสร็จและลบงาน | 45 นาที |
| 10 | ฟิลเตอร์และตัวนับ | 30 นาที |

เคล็ดลับ: ทำ Task ไหนผ่านแล้วให้ `git commit -m "task N"` ทุกครั้ง ถ้าพังจะย้อนกลับได้ง่าย

## ใช้กับ AI

คัดลอกเอกสารนี้ทั้งหมด แล้ววาง prompt ด้านล่างต่อท้าย AI จะรู้บริบท กติกา และตำแหน่งที่ผู้เรียนทำถึง จึงช่วยสอนต่อได้ตรงกับเอกสาร

```
คุณคือพี่เลี้ยงสอนเขียนโปรแกรม กำลังสอนผู้เรียนทำโปรเจกต์ Todo List ตามเอกสารด้านบน

กติกา:
1. ยึดเอกสารเป็นหลัก: ใช้ชื่อไฟล์ ชื่อ endpoint ชื่อ type และ stack ตามเอกสารเท่านั้น
   Stack: Node 24 LTS, Express 5, Prisma 6 + PostgreSQL 16, Zod, React + Vite, TypeScript strict
2. ทำทีละ Task ตามลำดับ ห้ามข้ามและห้ามทำของ Task ถัดไปล่วงหน้า
3. ห้ามใช้ any และห้ามเพิ่ม library ที่เอกสารไม่ได้ระบุ
4. ถ้าผู้เรียนส่ง error มา ให้อธิบายสาเหตุเป็นภาษาง่ายๆ ก่อน แล้วค่อยบอกวิธีแก้
5. ถ้าผู้เรียนส่งโค้ดมาให้รีวิว ให้เทียบกับโค้ดในเอกสาร ชี้จุดที่ต่าง และบอกว่าต่างแล้วมีผลอะไร
6. Task จะถือว่าเสร็จเมื่อผ่านทุกข้อในหัวข้อ "เช็คว่าผ่าน" ของ Task นั้น ให้ถามผลการทดสอบก่อนไปต่อ
7. ตอบเป็นภาษาไทย สั้น ตรงประเด็น

ตอนนี้ผู้เรียนอยู่ที่ Task: [ใส่เลข]
สิ่งที่ติดอยู่: [อธิบาย หรือวาง error/โค้ด]
```

## Task 0: เตรียมเครื่อง

**เป้าหมาย:** ติดตั้งเครื่องมือครบและสร้างโฟลเดอร์โปรเจกต์

**ทำไม:** ถ้าเวอร์ชันไม่ตรง คำสั่งในเอกสารอาจใช้ไม่ได้ จึงต้องเช็คตั้งแต่แรก

**ลงมือ:**

1. ติดตั้ง Node.js 24 LTS (รายชื่อโปรแกรมทั้งหมดอยู่ในหัวข้อ โปรแกรมที่ต้องลง ของ Spec)
2. ติดตั้ง PostgreSQL 16 ขึ้นไป จะใช้ตัวติดตั้งจาก postgresql.org หรือ Docker ก็ได้ แล้วจด user และ password ไว้ (user เริ่มต้นคือ `postgres`)
3. ติดตั้ง VS Code พร้อม extension Prisma และ Thunder Client (ใช้ยิง API แทน curl ได้)
4. ติดตั้ง Git
5. สร้างโฟลเดอร์โปรเจกต์

ถ้าใช้ Docker รันคำสั่งเดียวก็ได้ PostgreSQL ที่ user `postgres` และ password `secret`

```bash
docker run --name todo-postgres -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:16
```

```bash
mkdir todo-app
cd todo-app
git init
```

**เช็คว่าผ่าน:**

- [ ] `node -v` ได้ v24 ขึ้นไป
- [ ] `npm -v` และ `git --version` แสดงเวอร์ชัน
- [ ] เข้า PostgreSQL ได้ (เช่น `psql -U postgres -h localhost` หรือเปิดด้วย pgAdmin / DBeaver)

## Task 1: สร้าง server ตัวแรก

**เป้าหมาย:** เปิด `http://localhost:3000/api/health` แล้วได้ `{"ok":true}`

**ทำไม:** เริ่มจาก endpoint ง่ายที่สุดก่อน เพื่อยืนยันว่า TypeScript, Express และการรัน server ใช้ได้ ก่อนจะมีเรื่อง DB มาเกี่ยว

**ลงมือ:** ติดตั้ง package ในโฟลเดอร์ `server` (ล็อก Prisma ไว้ที่เวอร์ชัน 6 เพื่อให้คำสั่งตรงกับเอกสาร)

```bash
mkdir server && cd server
npm init -y
npm i express zod @prisma/client@6
npm i -D typescript tsx prisma@6 @types/express @types/node
```

แก้ `package.json` ให้มี 2 ส่วนนี้

```json
{
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "typecheck": "tsc --noEmit"
  }
}
```

```json
// server/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "noEmit": true
  },
  "include": ["src", "prisma"]
}
```

```ts
// server/src/index.ts
import express from "express";

const app = express();
app.use(express.json()); // แปลง body ที่เป็น JSON ให้อยู่ใน req.body

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(3000, () => console.log("API on http://localhost:3000"));
```

รันด้วย `npm run dev`

**เช็คว่าผ่าน:**

- [ ] เปิด `http://localhost:3000/api/health` ในเบราว์เซอร์แล้วเห็น `{"ok":true}`
- [ ] แก้ข้อความใน `index.ts` แล้วกด save จากนั้น server restart เอง
- [ ] `npm run typecheck` ไม่มี error

## Task 2: สร้างฐานข้อมูล

**เป้าหมาย:** มีตาราง `todos` ใน PostgreSQL พร้อมข้อมูลตัวอย่าง 3 แถว

**ทำไม:** Prisma ให้เราเขียนโครงตารางใน `schema.prisma` แล้วสร้างตารางจริงให้ (migration) และยังสร้าง type ของ TypeScript ให้ด้วย เวลา query จึงไม่ต้องเดา field

**ลงมือ:**

สร้างไฟล์ `.env` เก็บข้อมูลเชื่อมต่อ DB โดยเปลี่ยน `postgres:secret` เป็น user:password ของเครื่องตัวเอง ถ้ายังไม่มี database ชื่อ `todo_app` คำสั่ง migrate จะสร้างให้เอง

```bash
# server/.env
DATABASE_URL="postgresql://postgres:secret@localhost:5432/todo_app?schema=public"
```

```prisma
// server/prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") // อ่านจาก .env
}

generator client {
  provider = "prisma-client-js"
}

model Todo {
  id        Int      @id @default(autoincrement())
  title     String   @db.VarChar(200)
  done      Boolean  @default(false)
  createdAt DateTime @default(now()) @map("created_at")

  @@map("todos") // ชื่อตารางจริงใน DB
}
```

```bash
npx prisma migrate dev --name init
```

```ts
// server/src/db.ts
import { PrismaClient } from "@prisma/client";

// สร้าง client ไว้ตัวเดียวแล้วใช้ร่วมกันทั้งแอป
export const prisma = new PrismaClient();
```

```ts
// server/prisma/seed.ts
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
```

```bash
npx tsx prisma/seed.ts
```

เพิ่ม `.env` และ `node_modules` ลงใน `.gitignore` เพราะห้าม commit รหัสผ่าน DB ขึ้น Git

**เช็คว่าผ่าน:**

- [ ] `npx prisma migrate dev` รันผ่านโดยไม่มี error
- [ ] เปิด pgAdmin, DBeaver หรือ `npx prisma studio` แล้วเห็นตาราง `todos` มี 3 แถว
- [ ] พิมพ์ `prisma.todo.` ใน VS Code แล้วมี auto-complete ขึ้นมา

## Task 3: Validation และ error handler

**เป้าหมาย:** เตรียม Zod schema และ middleware จัดการ error ไว้ก่อนเขียน API

**ทำไม:** ข้อมูลจากผู้ใช้เชื่อไม่ได้ เราจึงต้องตรวจทุกครั้ง ถ้าตรวจไม่ผ่านต้องตอบ 400 ไม่ใช่ปล่อยให้ระบบพังเป็น 500 การรวม error ไว้ที่เดียวทำให้ทุก endpoint ตอบ error ในรูปแบบเดียวกัน ส่วน Express 5 จะส่ง error จาก async handler มาที่ middleware นี้ให้เอง

**ลงมือ:**

```ts
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
```

```ts
// server/src/errors.ts
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
```

เพิ่มใน `index.ts` เป็นบรรทัดสุดท้ายก่อน `app.listen` (error handler ต้องอยู่หลัง route ทั้งหมด)

```ts
import { errorHandler } from "./errors";
// ...
app.use(errorHandler);
```

**เช็คว่าผ่าน:**

- [ ] `npm run typecheck` ผ่าน
- [ ] อธิบายได้ว่าทำไม `"   "` ไม่ผ่าน `createTodoSchema` (`.trim()` ตัดช่องว่างจนเหลือ 0 ตัว)

## Task 4: API ดึงและเพิ่มงาน

**เป้าหมาย:** `GET /api/todos` คืนรายการงาน และ `POST /api/todos` เพิ่มงานใหม่ได้

**ทำไม:** REST ใช้ path เดียวกันแต่คนละ method โดย GET ใช้อ่าน และ POST ใช้สร้าง เมื่อสร้างสำเร็จจะตอบ 201 Created ไม่ใช่ 200 เพื่อบอกว่ามีของใหม่เกิดขึ้น

**ลงมือ:**

```ts
// server/src/routes/todos.ts
import { Router } from "express";
import { prisma } from "../db";
import { createTodoSchema, statusQuerySchema } from "../schemas";

export const todosRouter = Router();

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
```

ผูก router เข้ากับแอปใน `index.ts` โดยวางก่อน `app.use(errorHandler)`

```ts
import { todosRouter } from "./routes/todos";
// ...
app.use("/api/todos", todosRouter);
app.use(errorHandler);
```

**เช็คว่าผ่าน:** ยิงด้วย Thunder Client หรือ curl

```bash
curl http://localhost:3000/api/todos
curl "http://localhost:3000/api/todos?status=done"
curl -i "http://localhost:3000/api/todos?status=xyz"
curl -i -X POST http://localhost:3000/api/todos -H "Content-Type: application/json" -d '{"title":"buy coffee"}'
curl -i -X POST http://localhost:3000/api/todos -H "Content-Type: application/json" -d '{"title":"   "}'
```

- [ ] GET ได้ array และงานใหม่สุดอยู่บนสุด
- [ ] `?status=done` ได้เฉพาะงานที่ `done: true`
- [ ] `?status=xyz` ได้ 400
- [ ] POST title ปกติได้ 201 พร้อม `id` และ `createdAt`
- [ ] POST title ที่มีแต่ช่องว่างได้ 400

## Task 5: API แก้และลบงาน

**เป้าหมาย:** `PATCH /api/todos/:id` แก้ title หรือ done ได้ และ `DELETE /api/todos/:id` ลบได้

**ทำไม:** PATCH ใช้แก้บางส่วนจึงส่งมาแค่ฟิลด์ที่เปลี่ยน ถ้าหา id ไม่เจอต้องตอบ 404 ให้ชัด ส่วนลบสำเร็จจะตอบ 204 No Content เพราะไม่มีอะไรต้องส่งกลับ

**ลงมือ:** เพิ่มต่อท้าย `routes/todos.ts` และแก้บรรทัด import ด้านบนให้ครบ

```ts
// server/src/routes/todos.ts (เพิ่มต่อ)
import { createTodoSchema, idParamSchema, statusQuerySchema, updateTodoSchema } from "../schemas";
import { HttpError } from "../errors";

// หาไม่เจอให้ throw 404 ใช้ร่วมกันทั้ง PATCH และ DELETE
async function ensureExists(id: number): Promise<void> {
  const found = await prisma.todo.findUnique({ where: { id } });
  if (!found) throw new HttpError(404, "todo not found");
}

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
```

**เช็คว่าผ่าน:** สมมติว่ามีงาน id 1

```bash
curl -i -X PATCH http://localhost:3000/api/todos/1 -H "Content-Type: application/json" -d '{"done":false}'
curl -i -X PATCH http://localhost:3000/api/todos/1 -H "Content-Type: application/json" -d '{}'
curl -i -X PATCH http://localhost:3000/api/todos/abc -H "Content-Type: application/json" -d '{"done":true}'
curl -i -X PATCH http://localhost:3000/api/todos/999 -H "Content-Type: application/json" -d '{"done":true}'
curl -i -X DELETE http://localhost:3000/api/todos/1
curl -i -X DELETE http://localhost:3000/api/todos/1
```

- [ ] PATCH ปกติได้ 200 และ `done` เปลี่ยนจริง
- [ ] body `{}` ได้ 400
- [ ] id `abc` ได้ 400 และ id `999` ได้ 404
- [ ] DELETE ครั้งแรกได้ 204 และครั้งที่สองได้ 404
- [ ] ไม่มี request ไหนตอบ 500 เลย

จบ Task 5 แล้วหลังบ้านเสร็จสมบูรณ์ ถ้าอยากได้ข้อมูลตัวอย่างกลับมาให้รัน `npx tsx prisma/seed.ts` อีกรอบ

## Task 6: สร้างโปรเจกต์หน้าบ้าน

**เป้าหมาย:** มีโปรเจกต์ React ที่เรียก `/api` แล้วส่งต่อไปที่ server ได้ พร้อมไฟล์ type และไฟล์เรียก API

**ทำไม:** หน้าบ้านรันที่พอร์ต 5173 ส่วนหลังบ้านรันที่ 3000 ถ้าเรียกข้ามพอร์ตตรงๆ จะติด CORS proxy ของ Vite จะส่งต่อ request ให้ เบราว์เซอร์จึงเห็นเป็นที่เดียวกัน ส่วนการรวมการเรียก API ไว้ไฟล์เดียวทำให้ component ไม่ต้องรู้เรื่อง `fetch`

**ลงมือ:** เปิด terminal ใหม่ (ปล่อย server รันค้างไว้) แล้วไปที่โฟลเดอร์ `todo-app`

```bash
npm create vite@latest client -- --template react-ts
cd client
npm i
```

```ts
// client/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { "/api": "http://localhost:3000" }, // ส่งต่อ /api ไปหลังบ้าน
  },
});
```

```ts
// client/src/types.ts
export type Todo = {
  id: number;
  title: string;
  done: boolean;
  createdAt: string; // ISO string จาก API
};

export type Filter = "all" | "active" | "done";
```

```ts
// client/src/api.ts
import type { Todo } from "./types";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const body: { error?: string } = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `HTTP ${res.status}`);
  }
  // 204 ไม่มี body ให้อ่าน
  return (res.status === 204 ? undefined : await res.json()) as T;
}

export const api = {
  list: () => request<Todo[]>("/todos"),
  create: (title: string) =>
    request<Todo>("/todos", { method: "POST", body: JSON.stringify({ title }) }),
  update: (id: number, patch: Partial<Pick<Todo, "title" | "done">>) =>
    request<Todo>(`/todos/${id}`, { method: "PATCH", body: JSON.stringify(patch) }),
  remove: (id: number) => request<void>(`/todos/${id}`, { method: "DELETE" }),
};

// แปลง error อะไรก็ได้ให้เป็นข้อความ
export const toMessage = (e: unknown): string =>
  e instanceof Error ? e.message : "เกิดข้อผิดพลาด";
```

ลบไฟล์ `App.css` และล้างของใน `index.css` ทิ้งได้ จากนั้นรัน `npm run dev`

**เช็คว่าผ่าน:**

- [ ] เปิด `http://localhost:5173/api/health` แล้วเห็น `{"ok":true}` (แปลว่า proxy ใช้ได้)
- [ ] `npx tsc -b` ไม่มี error

## Task 7: แสดงรายการงาน

**เป้าหมาย:** เปิดเว็บแล้วเห็นรายการงานจาก DB พร้อมข้อความตอนกำลังโหลดและตอนโหลดไม่สำเร็จ

**ทำไม:** ข้อมูลจาก API มาไม่ทันที หน้าจอจึงมีอย่างน้อย 3 สถานะ คือกำลังโหลด สำเร็จ และพัง ถ้าไม่จัดการให้ครบผู้ใช้จะเห็นจอขาว `useEffect` แบบ `[]` จะรันครั้งเดียวตอนเปิดหน้า

**ลงมือ:**

```tsx
// client/src/components/TodoItem.tsx
import type { Todo } from "../types";

type Props = { todo: Todo };

export function TodoItem({ todo }: Props) {
  return (
    <li>
      {todo.done ? "☑" : "☐"} {todo.title}
    </li>
  );
}
```

```tsx
// client/src/components/TodoList.tsx
import type { Todo } from "../types";
import { TodoItem } from "./TodoItem";

type Props = { todos: Todo[] };

export function TodoList({ todos }: Props) {
  if (todos.length === 0) return <p>ยังไม่มีงาน ลองเพิ่มดูสิ</p>;
  return (
    <ul>
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} />
      ))}
    </ul>
  );
}
```

```tsx
// client/src/App.tsx
import { useEffect, useState } from "react";
import { api, toMessage } from "./api";
import type { Todo } from "./types";
import { TodoList } from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load(): Promise<void> {
    setLoading(true);
    setError(null);
    try {
      setTodos(await api.list());
    } catch (e) {
      setError(toMessage(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  if (loading) return <p>กำลังโหลด...</p>;
  if (error)
    return (
      <div>
        <p>โหลดไม่สำเร็จ: {error}</p>
        <button onClick={() => void load()}>ลองใหม่</button>
      </div>
    );

  return (
    <main>
      <h1>My Todos</h1>
      <TodoList todos={todos} />
    </main>
  );
}
```

**เช็คว่าผ่าน:**

- [ ] เปิด `http://localhost:5173` แล้วเห็นรายการเดียวกับใน `prisma studio`
- [ ] ปิด server แล้วรีเฟรช ต้องเห็นข้อความโหลดไม่สำเร็จพร้อมปุ่มลองใหม่
- [ ] เปิด server กลับมาแล้วกดลองใหม่ รายการกลับมาแสดง

## Task 8: ฟอร์มเพิ่มงาน

**เป้าหมาย:** พิมพ์ชื่องานแล้วกด Enter หรือปุ่มเพิ่ม งานใหม่จะขึ้นบนสุดและยังอยู่หลังรีเฟรช

**ทำไม:** หลัง API ตอบสำเร็จ ให้เอา todo ที่ได้กลับมาใส่ใน state เลยโดยไม่ต้องโหลดรายการใหม่ทั้งหมด การ disable ปุ่มระหว่างส่งช่วยกันคนกดรัวจนเกิดงานซ้ำ

**ลงมือ:**

```tsx
// client/src/components/TodoForm.tsx
import { useState, type FormEvent } from "react";
import { toMessage } from "../api";

type Props = { onAdd: (title: string) => Promise<void> };

export function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const trimmed = title.trim();

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault(); // กันไม่ให้ฟอร์มรีโหลดหน้า
    if (!trimmed || submitting) return;
    setSubmitting(true);
    try {
      await onAdd(trimmed);
      setTitle(""); // ล้างช่องเฉพาะตอนสำเร็จ
    } catch (err) {
      alert(toMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="พิมพ์งานใหม่..."
        maxLength={200}
      />
      <button type="submit" disabled={!trimmed || submitting}>
        เพิ่ม
      </button>
    </form>
  );
}
```

ใน `App.tsx` ให้เพิ่มฟังก์ชันนี้ แล้ววาง `<TodoForm onAdd={handleAdd} />` ไว้ใต้ `<h1>`

```tsx
async function handleAdd(title: string): Promise<void> {
  const todo = await api.create(title); // ถ้าพังจะ throw ให้ฟอร์มจัดการ
  setTodos((prev) => [todo, ...prev]);
}
```

**เช็คว่าผ่าน:**

- [ ] เพิ่มงานแล้วขึ้นบนสุดทันที และช่องกรอกว่าง
- [ ] รีเฟรชแล้วงานยังอยู่
- [ ] ช่องว่างหรือมีแต่ช่องว่าง ปุ่มเพิ่มกดไม่ได้
- [ ] กด Enter รัวๆ แล้วไม่เกิดงานซ้ำ

## Task 9: ติ๊กเสร็จและลบงาน

**เป้าหมาย:** คลิก checkbox แล้วสถานะเปลี่ยน และกดลบแล้วงานหายไป ทั้งสองอย่างต้องอยู่ถาวรหลังรีเฟรช

**ทำไม:** state ใน React ห้ามแก้ตรงๆ ต้องสร้าง array ใหม่เสมอ โดยใช้ `map` เมื่อแทนตัวที่แก้ และใช้ `filter` เมื่อเอาตัวที่ลบออก React จะเห็นว่าเป็นค่าใหม่แล้ววาดหน้าจอใหม่ให้

**ลงมือ:** แก้ `TodoItem` ให้มี checkbox และปุ่มลบ

```tsx
// client/src/components/TodoItem.tsx
import type { Todo } from "../types";

type Props = {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
};

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li>
      <label>
        <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo)} />
        <span
          style={{
            textDecoration: todo.done ? "line-through" : "none",
            color: todo.done ? "gray" : "inherit",
          }}
        >
          {todo.title}
        </span>
      </label>
      <button onClick={() => onDelete(todo)}>ลบ</button>
    </li>
  );
}
```

```tsx
// client/src/components/TodoList.tsx
import type { Todo } from "../types";
import { TodoItem } from "./TodoItem";

type Props = {
  todos: Todo[];
  emptyText: string;
  onToggle: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
};

export function TodoList({ todos, emptyText, onToggle, onDelete }: Props) {
  if (todos.length === 0) return <p>{emptyText}</p>;
  return (
    <ul>
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
```

ใน `App.tsx` เพิ่ม 2 ฟังก์ชันนี้ แล้วส่งเข้า `TodoList` (โค้ด App เต็มอยู่ใน Task 10)

```tsx
async function handleToggle(todo: Todo): Promise<void> {
  try {
    const updated = await api.update(todo.id, { done: !todo.done });
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  } catch (e) {
    alert(toMessage(e));
  }
}

async function handleDelete(todo: Todo): Promise<void> {
  if (!confirm(`ลบ "${todo.title}" ใช่ไหม?`)) return;
  try {
    await api.remove(todo.id);
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
  } catch (e) {
    alert(toMessage(e));
  }
}
```

**เช็คว่าผ่าน:**

- [ ] ติ๊กแล้วงานถูกขีดฆ่าเป็นสีเทา และติ๊กออกแล้วกลับเป็นปกติ
- [ ] ลบแล้วมีถามยืนยัน ถ้ากดยกเลิกงานต้องไม่หาย
- [ ] รีเฟรชแล้วสถานะและการลบยังคงอยู่

## Task 10: ฟิลเตอร์และตัวนับ

**เป้าหมาย:** มีปุ่ม ทั้งหมด / ค้าง / เสร็จ ไว้กรองรายการ และมีข้อความ "เหลือ N งาน"

**ทำไม:** รายการที่กรองแล้วเป็นค่าที่คำนวณจาก `todos` กับ `filter` จึงไม่ต้องเก็บเป็น state แยก ถ้าเก็บซ้ำต้องคอยอัปเดตสองที่และจะเพี้ยนง่าย

**ลงมือ:**

```tsx
// client/src/components/FilterBar.tsx
import type { Filter } from "../types";

const OPTIONS: { value: Filter; label: string }[] = [
  { value: "all", label: "ทั้งหมด" },
  { value: "active", label: "ค้าง" },
  { value: "done", label: "เสร็จ" },
];

type Props = { value: Filter; onChange: (value: Filter) => void };

export function FilterBar({ value, onChange }: Props) {
  return (
    <div>
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          aria-pressed={o.value === value}
          style={{ fontWeight: o.value === value ? "bold" : "normal" }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
```

นี่คือ `App.tsx` ฉบับสมบูรณ์ ใช้เทียบกับของตัวเองได้

```tsx
// client/src/App.tsx
import { useEffect, useState } from "react";
import { api, toMessage } from "./api";
import type { Filter, Todo } from "./types";
import { TodoForm } from "./components/TodoForm";
import { FilterBar } from "./components/FilterBar";
import { TodoList } from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load(): Promise<void> {
    setLoading(true);
    setError(null);
    try {
      setTodos(await api.list());
    } catch (e) {
      setError(toMessage(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleAdd(title: string): Promise<void> {
    const todo = await api.create(title);
    setTodos((prev) => [todo, ...prev]);
  }

  async function handleToggle(todo: Todo): Promise<void> {
    try {
      const updated = await api.update(todo.id, { done: !todo.done });
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (e) {
      alert(toMessage(e));
    }
  }

  async function handleDelete(todo: Todo): Promise<void> {
    if (!confirm(`ลบ "${todo.title}" ใช่ไหม?`)) return;
    try {
      await api.remove(todo.id);
      setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    } catch (e) {
      alert(toMessage(e));
    }
  }

  // ค่าที่คำนวณจาก state ไม่ต้องเก็บเป็น state เพิ่ม
  const visible = todos.filter((t) =>
    filter === "all" ? true : filter === "done" ? t.done : !t.done,
  );
  const remaining = todos.filter((t) => !t.done).length;
  const emptyText = todos.length === 0 ? "ยังไม่มีงาน ลองเพิ่มดูสิ" : "ไม่มีงานในหมวดนี้";

  if (loading) return <p>กำลังโหลด...</p>;
  if (error)
    return (
      <div>
        <p>โหลดไม่สำเร็จ: {error}</p>
        <button onClick={() => void load()}>ลองใหม่</button>
      </div>
    );

  return (
    <main>
      <h1>My Todos</h1>
      <TodoForm onAdd={handleAdd} />
      <FilterBar value={filter} onChange={setFilter} />
      <TodoList
        todos={visible}
        emptyText={emptyText}
        onToggle={(t) => void handleToggle(t)}
        onDelete={(t) => void handleDelete(t)}
      />
      <p>เหลือ {remaining} งาน</p>
    </main>
  );
}
```

**เช็คว่าผ่าน:**

- [ ] กดค้าง เห็นเฉพาะงานที่ยังไม่เสร็จ และกดเสร็จ เห็นเฉพาะงานที่เสร็จแล้ว
- [ ] อยู่ที่ฟิลเตอร์ "ค้าง" แล้วติ๊กเสร็จ งานนั้นหายจากรายการทันที
- [ ] ตัวนับไม่เปลี่ยนตามฟิลเตอร์ แต่เปลี่ยนเมื่อติ๊กหรือลบ
- [ ] ฟิลเตอร์ที่ไม่มีงานจะขึ้นข้อความ "ไม่มีงานในหมวดนี้"

## ตรวจงานรอบสุดท้าย

ระบบถือว่าเสร็จเมื่อผ่านทุกข้อด้านล่าง โดยต้องรันทั้ง server และ client พร้อมกัน

- [ ] `npm run typecheck` ในโฟลเดอร์ `server` และ `npx tsc -b` ในโฟลเดอร์ `client` ผ่านทั้งคู่
- [ ] ค้นหาคำว่า `any` ในโค้ดแล้วไม่เจอ
- [ ] ทำครบในรอบเดียวได้: เพิ่ม 3 งาน → ติ๊ก 1 งาน → ลบ 1 งาน → รีเฟรช → ข้อมูลตรงกับที่ทำไว้
- [ ] ปิด server แล้วหน้าเว็บแสดง error ไม่ใช่จอขาว
- [ ] ไล่ checklist ในหัวข้อ Checklist ส่งงาน ของ [Spec](https://claude.ai/code/artifact/89e0ae97-bbc2-4245-b6f5-06836920605f) ผ่านครบ

### ปัญหาที่เจอบ่อย

| อาการ | สาเหตุที่น่าจะเป็น | วิธีแก้ |
| --- | --- | --- |
| `Can't reach database server` หรือ `password authentication failed` | PostgreSQL ไม่ได้รัน หรือ user/password ใน `.env` ผิด | เปิด PostgreSQL แล้วตรวจ `DATABASE_URL` |
| `Cannot find module '@prisma/client'` หรือไม่มี `prisma.todo` | ยังไม่ได้ generate client | รัน `npx prisma generate` |
| หน้าเว็บขึ้น `HTTP 404` ทุก request | proxy ไม่ทำงาน หรือ server ไม่ได้รัน | เช็ค `vite.config.ts` แล้ว restart `npm run dev` ของ client |
| POST แล้วได้ 400 ทั้งที่ส่ง title | ไม่ได้ส่ง header `Content-Type: application/json` | เพิ่ม header หรือตรวจ `api.ts` |
| ได้ 500 แทน 404 | `app.use(errorHandler)` อยู่ก่อน router | ย้าย errorHandler ไปไว้หลังสุด |
| ติ๊กแล้วหน้าจอไม่เปลี่ยน | แก้ state ตรงๆ เช่น `todo.done = true` | สร้าง array ใหม่ด้วย `map` |

### ไปต่อ

ทำครบแล้ว ให้ลองต่อยอดตามหัวข้อ "ต่อยอด" ใน Spec ตามลำดับนี้: Due date → Priority → ลากเรียงลำดับ ใช้ prompt ในหัวข้อ ใช้กับ AI ได้เหมือนเดิม แค่เปลี่ยนบรรทัด Task เป็นชื่อฟีเจอร์ที่จะทำ
