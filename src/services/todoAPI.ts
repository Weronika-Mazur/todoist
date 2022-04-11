import { fetchService, FetchService } from "./fetchService";
import { TaskContent, Task } from "types/type";

class TodoAPI {
  constructor(private readonly fetchService: FetchService) {}
  getTodoList() {
    return this.fetchService.get<undefined, Task[]>("todos/");
  }

  deleteTask(id: string) {
    const endpoint = `todos/delete-task/${id}`;
    return this.fetchService.delete<undefined, Task[]>(endpoint);
  }

  clearCompleted() {
    return this.fetchService.delete<undefined, Task[]>("todos/clear-tasks");
  }

  addTask(newTask: TaskContent) {
    return this.fetchService.post<TaskContent, Task[]>(
      "todos/add-task",
      newTask
    );
  }

  updateTask(changes: TaskContent) {
    const endpoint = `todos/change-task/${changes._id}`;
    return this.fetchService.put<TaskContent, Task[]>(endpoint, changes);
  }
}

export const todoApi = new TodoAPI(fetchService);
