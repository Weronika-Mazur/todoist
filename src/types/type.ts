export type TaskStatus = "completed" | "active";

export interface Task {
  taskId: string;
  content: string;
  status: TaskStatus;
  priority?: number;
  dueDate?: Date;
}

export interface List {
  listId: string;
  name: string;
  owner: string;
  color: ListColors;
  activeCount: number;
}

export interface ListContent {
  name: string;
  color: ListColors;
}

export interface TaskContent {
  taskId?: string;
  content?: string;
  status?: TaskStatus;
  dueDate?: Date;
  priority?: number;
}

export interface TaskEditMode {
  active: boolean;
  id: string;
}

export interface ListEditMode {
  active?: boolean;
  id: string;
  name: string;
  color: ListColors;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface Token {
  token?: string;
  error?: string;
}

export type Filter = "all" | "active" | "completed";

export type Modal =
  | undefined
  | "createList"
  | "editList"
  | "dropDown"
  | "deleteList";

export interface DropDown {
  active: boolean;
  x: number;
  y: number;
  id: string;
}

export interface FilterArray {
  type: Filter;
  desc: string;
}

export enum ListColors {
  green = "GREEN",
  sky = "SKY",
  violet = "VIOLET",
  fuchsia = "FUCHSIA",
  rose = "ROSE",
}
