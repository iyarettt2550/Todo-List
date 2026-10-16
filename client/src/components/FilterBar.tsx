import type { Filter } from "../types";

const OPTIONS: { value: Filter; label: string }[] = [
  { value: "all", label: "ทั้งหมด" },
  { value: "active", label: "ค้างอยู่" },
  { value: "done", label: "เสร็จสิ้น" },
];

type Props = {
  value: Filter;
  onChange: (value: Filter) => void;
  counts?: { all: number; active: number; done: number };
};

export function FilterBar({ value, onChange, counts }: Props) {
  return (
    <div className="flex p-1 bg-slate-100/90 rounded-2xl border border-slate-200/60 gap-1 shadow-inner">
      {OPTIONS.map((o) => {
        const isActive = o.value === value;
        const count = counts ? counts[o.value] : null;

        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={isActive}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
              isActive
                ? "bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-md shadow-blue-500/25 font-semibold scale-[1.01]"
                : "text-slate-600 hover:text-blue-700 hover:bg-white/70"
            }`}
          >
            <span>{o.label}</span>
            {count !== null && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-semibold transition-colors ${
                  isActive
                    ? "bg-white/25 text-white"
                    : "bg-slate-200/70 text-slate-600"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}