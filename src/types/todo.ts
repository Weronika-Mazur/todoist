import { Tag } from "./tag";

export interface Task {
  taskId: string;
  listId: string;
  content: string;
  status: TaskStatus;
  priority: number;
  dueDate?: string;
  tags?: Tag[];
}

export type TaskStatus = "completed" | "active";

export interface NewTask {
  content: string;
  status?: TaskStatus;
  dueDate?: string;
  priority: Priority;
  tags: Tag[];
}

export interface TaskFilters {
  priority?: Priority | string;
  tag?: string;
  date?: string;
  listId?: string;
}

export interface TaskContent {
  taskId?: string;
  content?: string;
  status?: TaskStatus;
  dueDate?: string;
  priority?: Priority;
  tags?: Tag[];
}

export enum Priority {
  P1 = 1,
  P2 = 2,
  P3 = 3,
  P4 = 4,
  P5 = 5,
}
