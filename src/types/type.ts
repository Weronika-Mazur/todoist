export interface EditMode {
  active: boolean;
  id: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface ChangeEmailValues {
  email: string;
  repeatEmail: string;
  password: string;
}

export interface ChangePasswordValues {
  newPassword: string;
  repeatNewPassword: string;
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

export enum Modal {
  CreateList = "createList",
  EditList = "editList",
  DeleteList = "deleteList",
  ChangeEmail = "changeEmail",
  ChangePassword = "changePassword",
  DeleteUser = "deleteUser",
}

export interface FilterArray {
  type: Filter;
  desc: string;
}

export interface SideBarProps {
  isVisible: boolean;
}

export interface User {
  userId: string;
  userName: string;
  email: string;
  avatarUrl?: string;
}

export interface ErrorMessage {
  message: string;
}
