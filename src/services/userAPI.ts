import { fetchService, FetchService } from "./fetchService";
import { LoginFormValues, Token } from "types/type";

class UserAPI {
  constructor(private readonly fetchService: FetchService) {}

  login(values: LoginFormValues) {
    return this.fetchService.post<LoginFormValues, Token>("user/login", values);
  }

  // register(values: FormValues) {
  //   return this.fetchService.post<FormValues, User>("user/register", values);
  // }
}

export const userApi = new UserAPI(fetchService);
