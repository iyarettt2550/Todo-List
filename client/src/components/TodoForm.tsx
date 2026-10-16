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