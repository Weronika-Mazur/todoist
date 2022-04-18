import { fetchService, FetchService } from "./fetchService";
import { List } from "types/type";

class ListAPI {
  constructor(private readonly fetchService: FetchService) {}
  getLists() {
    return this.fetchService.get<undefined, List[]>("list/");
  }
}

export const listApi = new ListAPI(fetchService);
