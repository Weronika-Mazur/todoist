import { useQueryClient } from "react-query";

export const useLogout = () => {
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem("jwt");
    queryClient.clear();
  };

  return { logout };
};
