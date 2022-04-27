import { fetchService, FetchService } from "./fetchService";
import { List, ListContent } from "types/type";

class ListAPI {
  constructor(private readonly fetchService: FetchService) {}
  getLists() {
    return this.fetchService.get<undefined, List[]>("list/");
  }

  addList(newList: ListContent) {
    return this.fetchService.post<ListContent, List>("list/add-list", newList);
  }

  updateList(newList: ListContent, listId: string) {
    const endpoint = `list/update-list/${listId}`;
    return this.fetchService.put<ListContent, List>(endpoint, newList);
  }

  deleteList(listId: string) {
    const endpoint = `list/delete-list/${listId}`;
    return this.fetchService.delete<undefined, List>(endpoint);
  }
}

export const listApi = new ListAPI(fetchService);
