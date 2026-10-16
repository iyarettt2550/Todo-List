import type { Todo } from "./types";

const STORAGE_KEY = "todos_data";

// ข้อมูลตัวอย่างเริ่มต้น (เมื่อเปิดเว็บครั้งแรก)
const INITIAL_TODOS: Todo[] = [
  { id: 1, title: "ทดลองใช้งาน Todo App ธีมสีฟ้า", done: true, createdAt: new Date().toISOString() },
  { id: 2, title: "อ่านหนังสือเตรียมสอบ", done: false, createdAt: new Date().toISOString() },
  { id: 3, title: "ออกกำลังกาย 30 นาที", done: false, createdAt: new Date().toISOString() },
];

function getStoredTodos(): Todo[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TODOS));
    return INITIAL_TODOS;
  }
  return JSON.parse(data);
}

function saveTodos(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// จำลอง API ด้วย localStorage (ไม่ต้องพึ่ง Backend & Database)
export const api = {
  list: async (): Promise<Todo[]> => {
    return getStoredTodos();
  },

  create: async (title: string): Promise<Todo> => {
    const todos = getStoredTodos();
    const newTodo: Todo = {
      id: Date.now(), // ใช้ timestamp เป็น id
      title,
      done: false,
      createdAt: new Date().toISOString(),
    };
    saveTodos([newTodo, ...todos]);
    return newTodo;
  },

  update: async (id: number, patch: Partial<Pick<Todo, "title" | "done">>): Promise<Todo> => {
    const todos = getStoredTodos();
    const target = todos.find((t) => t.id === id);
    if (!target) throw new Error("ไม่พบรายการนี้");
    const updated = { ...target, ...patch };
    saveTodos(todos.map((t) => (t.id === id ? updated : t)));
    return updated;
  },

  remove: async (id: number): Promise<void> => {
    const todos = getStoredTodos();
    saveTodos(todos.filter((t) => t.id !== id));
  },
};

export const toMessage = (e: unknown): string =>
  e instanceof Error ? e.message : "เกิดข้อผิดพลาด";
