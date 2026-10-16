import { useState, type FormEvent } from "react";
import { toMessage } from "../api";

type Props = { onAdd: (title: string) => Promise<void> };

export function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const trimmed = title.trim();

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    if (!trimmed || submitting) return;
    setSubmitting(true);
    try {
      await onAdd(trimmed);
      setTitle("");
    } catch (err) {
      alert(toMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="relative flex items-center">
      <div className="absolute left-4 pointer-events-none text-blue-400">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
          />
        </svg>
      </div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="เพิ่มงานใหม่ เช่น อ่านหนังสือ, ซื้อของ..."
        maxLength={200}
        disabled={submitting}
        className="w-full pl-12 pr-28 py-3.5 bg-slate-50/80 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-blue-500 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/15 transition-all duration-200 text-sm sm:text-base shadow-sm"
      />
      <button
        type="submit"
        disabled={!trimmed || submitting}
        className="absolute right-1.5 top-1.5 bottom-1.5 px-4 sm:px-5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 active:scale-95 text-white font-medium text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all duration-200 flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none cursor-pointer"
      >
        {submitting ? (
          <>
            <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <span className="hidden sm:inline">กำลังเพิ่ม</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>เพิ่ม</span>
          </>
        )}
      </button>
    </form>
  );
}