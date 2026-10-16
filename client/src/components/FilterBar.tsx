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