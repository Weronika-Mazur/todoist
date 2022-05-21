export type TaskStatus = "completed" | "active";

export interface Task {
  taskId: string;
  content: string;
  status: TaskStatus;
  priority: number;
  dueDate?: string;
  tags?: Tag[];
}

export interface List {
  listId: string;
  name: string;
  owner: string;
  color: ListColors;
  activeCount: number;
}

export interface Tag {
  tagId: string;
  owner: string;
  content: string;
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
  priority?: Priority;
  tags?: Tag[];
}

export interface TagContent {
  content: string;
}

export interface EditMode {
  active: boolean;
  id: string;
}

export interface SelectedList {
  id: string;
  name: string;
  color: ListColors;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  repeatPassword?: string;
}

export interface Token {
  token?: string;
  error?: string;
}

export type Filter = "all" | "active" | "completed";

export type Modal = undefined | "createList" | "editList" | "deleteList";

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

export enum Priority {
  p1 = 1,
  p2,
  p3,
  p4,
  p5,
}

export interface TaskFilters {
  priority?: Priority;
  tag?: string;
}
