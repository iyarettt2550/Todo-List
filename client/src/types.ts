export type Todo = {
  id: number;
  title: string;
  done: boolean;
  createdAt: string; // ISO string จาก API
};

export type Filter = "all" | "active" | "done";