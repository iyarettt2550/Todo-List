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