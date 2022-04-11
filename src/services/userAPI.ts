import { fetchService, FetchService } from "./fetchService";
import { FormValues, User } from "types/type";

class UserAPI {
  constructor(private readonly fetchService: FetchService) {}

  login(values: FormValues) {
    return this.fetchService.post<FormValues, User>("user/login", values);
  }

  register(values: FormValues) {
    return this.fetchService.post<FormValues, User>("user/register", values);
  }
}

export const userApi = new UserAPI(fetchService);
