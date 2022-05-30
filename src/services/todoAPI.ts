import { fetchService, FetchService } from "./fetchService";
import { TaskContent, Task, TaskFilters } from "types/type";
import { endpoints } from "utils/endpoints";

class TodoAPI {
  constructor(private readonly fetchService: FetchService) {}

  getTasks(listId = "", filters?: TaskFilters) {
    const filterParams = filters
      ? new URLSearchParams([...Object.entries(filters)])
      : "";

    const endpointUrl = `${endpoints.todos.getTasks}${listId}`;

    const endpoint = filterParams
      ? `${endpointUrl}?${filterParams}`
      : endpointUrl;

    return this.fetchService.get<undefined, Task[]>(endpoint);
  }

  addTask(listId: string, newTask: TaskContent) {
    const endpoint = `${endpoints.todos.addTask}${listId}`;

    return this.fetchService.post<TaskContent, Task>(endpoint, newTask);
  }

  deleteTask(taskId: string) {
    const endpoint = `${endpoints.todos.deleteTask}${taskId}`;
    return this.fetchService.delete<undefined, Task>(endpoint);
  }

  clearCompleted(listId: string) {
    const endpoint = `${endpoints.todos.clearTasks}${listId}`;
    return this.fetchService.delete<undefined, Task[]>(endpoint);
  }

  updateTask(taskId: string, changes: TaskContent) {
    const endpoint = `${endpoints.todos.updateTask}${taskId}`;
    return this.fetchService.put<TaskContent, Task>(endpoint, changes);
  }
}

export const todoApi = new TodoAPI(fetchService);
