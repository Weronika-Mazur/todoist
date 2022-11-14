import { fetchService, FetchService } from "services/fetchService";
import { List, ListContent } from "types/list";
import { endpoints } from "utils/endpoints";
import { headerJson } from "utils/constants";

class ListAPI {
  constructor(private readonly fetchService: FetchService) {}
  getLists() {
    return this.fetchService.get<undefined, List[]>(
      endpoints.list.getLists,
      headerJson
    );
  }

  addList(newList: ListContent) {
    return this.fetchService.post<ListContent, List>(
      endpoints.list.addList,
      newList,
      headerJson
    );
  }

  updateList(newList: ListContent, listId: string) {
    const endpoint = `${endpoints.list.updateList}${listId}`;
    return this.fetchService.put<ListContent, List>(
      endpoint,
      newList,
      headerJson
    );
  }

  deleteList(listId: string) {
    const endpoint = `${endpoints.list.deleteList}${listId}`;
    return this.fetchService.delete<undefined, List>(
      endpoint,
      undefined,
      headerJson
    );
  }
}

export const listApi = new ListAPI(fetchService);
