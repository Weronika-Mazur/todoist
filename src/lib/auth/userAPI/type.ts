import { User } from "types/type";

export interface UserResponse {
  token?: string;
  user?: User;
  error?: string;
}
