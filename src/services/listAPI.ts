import { fetchService, FetchService } from "./fetchService";
import { List, ListContent } from "types/type";
import { endpoints } from "utils/endpoints";

class ListAPI {
  constructor(private readonly fetchService: FetchService) {}
  getLists() {
    return this.fetchService.get<undefined, List[]>(endpoints.list.getLists);
  }

  addList(newList: ListContent) {
    return this.fetchService.post<ListContent, List>(
      endpoints.list.addList,
      newList
    );
  }

  updateList(newList: ListContent, listId: string) {
    const endpoint = `${endpoints.list.updateList}${listId}`;
    return this.fetchService.put<ListContent, List>(endpoint, newList);
  }

  deleteList(listId: string) {
    const endpoint = `${endpoints.list.deleteList}${listId}`;
    return this.fetchService.delete<undefined, List>(endpoint);
  }
}

export const listApi = new ListAPI(fetchService);
