export interface Task {
  _id: string;
  content: string;
  state: "completed" | "active";
}

export interface TaskContent {
  _id?: string;
  content?: string;
  state?: "completed" | "active";
}

export interface EditMode {
  active: boolean;
  id: string;
}

export interface FormValues {
  email?: string;
  password?: string;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  todo: Task[];
  token?: string;
  error?: string;
}

export interface FilterArray {
  type: Filter;
  desc: string;
}

export type Filter = "all" | "active" | "completed";
