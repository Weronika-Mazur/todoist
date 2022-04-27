import { fetchService, FetchService } from "./fetchService";
import { LoginFormValues, RegisterFormValues, Token } from "types/type";

class UserAPI {
  constructor(private readonly fetchService: FetchService) {}

  login(values: LoginFormValues) {
    return this.fetchService.post<LoginFormValues, Token>("user/login", values);
  }

  register(values: RegisterFormValues) {
    return this.fetchService.post<RegisterFormValues, Token>(
      "user/register",
      values
    );
  }
}

export const userApi = new UserAPI(fetchService);
