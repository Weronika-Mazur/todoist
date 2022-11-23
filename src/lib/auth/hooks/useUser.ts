import { useQuery } from "react-query";
import jwt_decode from "jwt-decode";

import { AppsQueryKeys } from "utils/constants";
import { userApi } from "../userAPI/userAPI";
import { ErrorMessage, User } from "types/type";

const loadUser = async () => {
  const token = localStorage.getItem("jwt");

  if (token) {
    const { userId }: { userId: string } = jwt_decode(token);
    const data = await userApi.getUser(userId);
    return data;
  }
  return null;
};

export const useUser = () => {
  const query = useQuery<User | null, ErrorMessage>({
    queryKey: AppsQueryKeys.user,
    queryFn: loadUser,
    retry: false,
  });

  const { data: user, ...rest } = query;

  return { user, ...rest };
};
