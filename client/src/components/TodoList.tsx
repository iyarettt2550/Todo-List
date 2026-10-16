import type { Todo } from "../types";
import { TodoItem } from "./TodoItem";

type Props = {
  todos: Todo[];
  emptyText: string;
  onToggle: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
};

export function TodoList({ todos, emptyText, onToggle, onDelete }: Props) {
  if (todos.length === 0) return <p>{emptyText}</p>;
  return (
    <ul>
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}