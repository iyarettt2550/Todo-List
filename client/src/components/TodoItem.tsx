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