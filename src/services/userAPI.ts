import { fetchService, FetchService } from "./fetchService";
import { LoginFormValues, RegisterFormValues, Token } from "types/type";
import { endpoints } from "utils/endpoints";

class UserAPI {
  constructor(private readonly fetchService: FetchService) {}

  login(values: LoginFormValues) {
    return this.fetchService.post<LoginFormValues, Token>(
      endpoints.user.login,
      values
    );
  }

  register(values: RegisterFormValues) {
    return this.fetchService.post<RegisterFormValues, Token>(
      endpoints.user.register,
      values
    );
  }
}

export const userApi = new UserAPI(fetchService);
