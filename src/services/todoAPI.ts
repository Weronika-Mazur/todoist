import { fetchService, FetchService } from "./fetchService";
import { TaskContent, Task, TaskFilters } from "types/type";

class TodoAPI {
  constructor(private readonly fetchService: FetchService) {}
  getTasks(listId: string) {
    const endpoint = `todos/${listId}`;
    return this.fetchService.get<undefined, Task[]>(endpoint);
  }

  getFilteredTasks(filters: TaskFilters) {
    const filterParams = filters
      ? new URLSearchParams([...Object.entries(filters)])
      : "";

    const endpoint = filterParams ? `todos/?${filterParams}` : "todos/";

    return this.fetchService.get<undefined, Task[]>(endpoint);
  }

  addTask(listId: string, newTask: TaskContent) {
    const endpoint = `todos/add-task/${listId}`;

    return this.fetchService.post<TaskContent, Task>(endpoint, newTask);
  }

  deleteTask(taskId: string) {
    const endpoint = `todos/delete-task/${taskId}`;
    return this.fetchService.delete<undefined, Task>(endpoint);
  }

  clearCompleted(listId: string) {
    const endpoint = `todos/clear-tasks/${listId}`;
    return this.fetchService.delete<undefined, Task[]>(endpoint);
  }

  updateTask(taskId: string, changes: TaskContent) {
    const endpoint = `todos/change-task/${taskId}`;
    return this.fetchService.put<TaskContent, Task>(endpoint, changes);
  }
}

export const todoApi = new TodoAPI(fetchService);
