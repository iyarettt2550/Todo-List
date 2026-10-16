import type { Todo } from "../types";

type Props = {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
};

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  // Format creation time if available
  const formattedTime = (() => {
    try {
      if (!todo.createdAt) return null;
      const d = new Date(todo.createdAt);
      if (isNaN(d.getTime())) return null;
      return d.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
    } catch {
      return null;
    }
  })();

  return (
    <li
      className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 select-none ${
        todo.done
          ? "bg-blue-50/30 border-blue-100/70 opacity-80"
          : "bg-white border-slate-200/70 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5 hover:-translate-y-0.5"
      }`}
    >
      <label className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo)}
          className="sr-only"
        />
        {/* Custom Checkbox */}
        <div
          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200 shrink-0 ${
            todo.done
              ? "bg-gradient-to-tr from-blue-600 to-sky-500 text-white shadow-sm shadow-blue-500/30 scale-100"
              : "border-2 border-slate-300 bg-white group-hover:border-blue-500 group-hover:scale-105"
          }`}
        >
          {todo.done && (
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          )}
        </div>

        {/* Title and Time */}
        <div className="flex flex-col min-w-0 pr-2">
          <span
            className={`text-sm sm:text-base leading-snug break-words transition-all duration-200 ${
              todo.done
                ? "line-through text-slate-400"
                : "text-slate-800 font-medium group-hover:text-blue-950"
            }`}
          >
            {todo.title}
          </span>
          {formattedTime && (
            <span className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1 font-normal">
              <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {formattedTime} น.
            </span>
          )}
        </div>
      </label>

      {/* Delete Button */}
      <button
        type="button"
        onClick={() => onDelete(todo)}
        aria-label={`ลบ ${todo.title}`}
        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200 cursor-pointer active:scale-90 shrink-0 opacity-80 sm:opacity-0 group-hover:opacity-100 focus:opacity-100"
      >
        <svg
          className="w-4.5 h-4.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </li>
  );
}