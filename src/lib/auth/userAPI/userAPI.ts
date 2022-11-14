import { fetchService, FetchService } from "services/fetchService";
import { endpoints } from "utils/endpoints";
import { headerJson } from "utils/constants";
import { UserResponse } from "./type";
import { LoginFormValues, RegisterFormValues, User } from "types/type";
import { ChangeEmail, ChangePassword } from "../types/type";

class UserAPI {
  constructor(private readonly fetchService: FetchService) {}

  login(values: LoginFormValues) {
    return this.fetchService.post<LoginFormValues, UserResponse>(
      endpoints.user.login,
      values,
      headerJson
    );
  }

  register(values: RegisterFormValues) {
    return this.fetchService.post<RegisterFormValues, UserResponse>(
      endpoints.user.register,
      values,
      headerJson
    );
  }

  getUser(userId: string) {
    const endpoint = `${endpoints.user.getUser}${userId}`;
    return this.fetchService.get<undefined, User>(endpoint, headerJson);
  }

  updateAccount(changes: FormData) {
    return this.fetchService.post<FormData, UserResponse>(
      endpoints.account.updateAccount,
      changes
    );
  }
  changeEmail(changes: ChangeEmail) {
    return this.fetchService.put<ChangeEmail, UserResponse>(
      endpoints.account.changeEmail,
      changes,
      headerJson
    );
  }
  changePassword(changes: ChangePassword) {
    return this.fetchService.put<ChangePassword, undefined>(
      endpoints.account.changePassword,
      changes,
      headerJson
    );
  }

  removeProfilePicture() {
    return this.fetchService.delete<undefined, User>(
      endpoints.account.removeProfilePicture,
      undefined,
      headerJson
    );
  }
  deleteUser(password: string) {
    return this.fetchService.delete<{ password: string }, User>(
      endpoints.account.deleteUser,
      { password },
      headerJson
    );
  }
}

export const userApi = new UserAPI(fetchService);
