import { UserResponse } from "../userAPI/type";

export const handleUserResponse = async (data: UserResponse) => {
  const { token, user } = data;

  if (!token || !user) return null;

  token && localStorage.setItem("jwt", token);
  return user;
};
