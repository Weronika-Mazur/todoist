export const endpoints = {
  list: {
    getLists: "list/",
    addList: "list/add-list",
    updateList: "list/update-list/",
    deleteList: "list/delete-list/",
  },

  todos: {
    getTasks: "todos/",
    addTask: "todos/add-task/",
    deleteTask: "todos/delete-task/",
    clearTasks: "todos/clear-tasks/",
    updateTask: "todos/change-task/",
  },

  tag: {
    getTags: "tags/",
    addTag: "tags/add-tag",
    deleteTag: "tags/delete-tag/",
    updateTag: "tags/change-tag/",
  },

  user: {
    login: "user/login",
    register: "user/register",
  },
};
