import { fetchService, FetchService } from "services/fetchService";
import { TaskContent, Task, TaskFilters } from "types/todo";
import { endpoints } from "utils/endpoints";
import { getEndpointUrl } from "utils/helpers";
import { headerJson } from "utils/constants";

class TodoAPI {
  constructor(private readonly fetchService: FetchService) {}

  getTasks(listId = "", filters?: TaskFilters) {
    const endpoint = getEndpointUrl(endpoints.todos.getTasks, listId, filters);

    return this.fetchService.get<undefined, Task[]>(endpoint, headerJson);
  }

  addTask(listId: string, newTask: TaskContent) {
    const endpoint = `${endpoints.todos.addTask}${listId}`;

    return this.fetchService.post<TaskContent, Task>(
      endpoint,
      newTask,
      headerJson
    );
  }

  deleteTask(taskId: string) {
    const endpoint = `${endpoints.todos.deleteTask}${taskId}`;
    return this.fetchService.delete<undefined, Task>(
      endpoint,
      undefined,
      headerJson
    );
  }

  clearCompleted(listId = "", filters?: TaskFilters) {
    const endpoint = getEndpointUrl(
      endpoints.todos.clearTasks,
      listId,
      filters
    );

    return this.fetchService.delete<undefined, Task[]>(
      endpoint,
      undefined,
      headerJson
    );
  }

  updateTask(taskId: string, changes: TaskContent) {
    const endpoint = `${endpoints.todos.updateTask}${taskId}`;
    return this.fetchService.put<TaskContent, Task>(
      endpoint,
      changes,
      headerJson
    );
  }
}

export const todoApi = new TodoAPI(fetchService);
