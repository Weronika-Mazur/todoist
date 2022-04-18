export interface Task {
  taskId: string;
  content: string;
  state: "completed" | "active";
  priority?: number;
  dueDate?: Date;
}

export interface List {
  listId: string;
  name: string;
  owner: string;
  color: number;
  activeCount: number;
}

export interface TaskContent {
  taskId?: string;
  content?: string;
  state?: "completed" | "active";
  dueDate?: Date;
  priority?: number;
}

export interface EditMode {
  active: boolean;
  id: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface Token {
  token?: string;
  error?: string;
}

export interface FilterArray {
  type: Filter;
  desc: string;
}

export type Filter = "all" | "active" | "completed";
