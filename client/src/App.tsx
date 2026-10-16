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
    let ignore = false;
    api
      .list()
      .then((data) => {
        if (!ignore) {
          setTodos(data);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!ignore) {
          setError(toMessage(e));
          setLoading(false);
        }
      });
    return () => {
      ignore = true;
    };
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

  const completedCount = todos.filter((t) => t.done).length;
  const activeCount = todos.filter((t) => !t.done).length;
  const progressPercent = todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100);

  const visible = todos.filter((t) =>
    filter === "all" ? true : filter === "done" ? t.done : !t.done,
  );
  const emptyText =
    todos.length === 0
      ? "ยังไม่มีรายการงาน เริ่มต้นเพิ่มงานใหม่ได้เลย"
      : filter === "active"
      ? "ไม่มีงานที่ค้างอยู่ ยอดเยี่ยมมาก!"
      : "ยังไม่มีงานที่ทำเสร็จในหมวดนี้";

  const todayThai = new Intl.DateTimeFormat("th-TH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 flex justify-center items-start relative selection:bg-blue-500 selection:text-white">
      {/* Decorative ambient background glows */}
      <div className="fixed top-12 left-1/4 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-12 right-1/4 w-96 h-96 bg-sky-300/25 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Container Card */}
      <main className="w-full max-w-xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/10 border border-blue-100/80 p-6 sm:p-8 space-y-6 relative overflow-hidden transition-all">
        {/* Top Gradient Stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500" />

        {/* Header Section */}
        <header className="flex items-start justify-between gap-4 pt-1">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                สิ่งที่ต้องทำ <span className="text-blue-600 font-extrabold text-lg sm:text-xl">Todo</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5 capitalize">{todayThai}</p>
            </div>
          </div>

          {/* Quick Total Badge */}
          <div className="text-right shrink-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 shadow-xs">
              {todos.length} รายการ
            </span>
          </div>
        </header>

        {/* Progress Card (Displays if there are any todos) */}
        {todos.length > 0 && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/70 via-sky-50/50 to-indigo-50/60 border border-blue-100/90 shadow-xs">
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-slate-700 mb-2">
              <span className="flex items-center gap-1.5 text-blue-900">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                ความคืบหน้าภาพรวม
              </span>
              <span className="text-blue-600 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-blue-200/50 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-2 text-right">
              <span className="text-xs text-slate-500">
                เสร็จแล้ว <strong className="text-blue-700">{completedCount}</strong> จากทั้งหมด {todos.length} งาน
              </span>
            </div>
          </div>
        )}

        {/* Add Todo Form */}
        <section aria-label="เพิ่มงานใหม่">
          <TodoForm onAdd={handleAdd} />
        </section>

        {/* Filter Section */}
        <section aria-label="ตัวกรองสถานะ">
          <FilterBar
            value={filter}
            onChange={setFilter}
            counts={{ all: todos.length, active: activeCount, done: completedCount }}
          />
        </section>

        {/* Content area: Loading, Error, or List */}
        <section aria-label="รายการงาน">
          {loading ? (
            <div className="py-14 text-center space-y-3">
              <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-medium text-slate-500">กำลังโหลดรายการงานของคุณ...</p>
            </div>
          ) : error ? (
            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-3">
              <p className="text-sm text-rose-700 font-medium">โหลดไม่สำเร็จ: {error}</p>
              <button
                type="button"
                onClick={() => void load()}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm cursor-pointer"
              >
                ลองใหม่อีกครั้ง
              </button>
            </div>
          ) : (
            <TodoList
              todos={visible}
              emptyText={emptyText}
              onToggle={(t) => void handleToggle(t)}
              onDelete={(t) => void handleDelete(t)}
            />
          )}
        </section>

        {/* Footer info */}
        <footer className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            ค้างอยู่ <strong className="text-slate-700 font-semibold">{activeCount}</strong> งาน
          </span>
          <span className="text-slate-400">Todo App • Blue Theme</span>
        </footer>
      </main>
    </div>
  );
}