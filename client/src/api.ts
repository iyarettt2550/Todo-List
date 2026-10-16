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