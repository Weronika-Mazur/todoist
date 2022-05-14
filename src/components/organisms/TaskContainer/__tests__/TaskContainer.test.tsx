import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import TaskContainer from "../TaskContainer";
import { renderWithState } from "utils/testHelpers";
import { todoApi } from "services/todoAPI";
import { Priority, TaskContent } from "types/type";

const todoState = {
  todo: {
    taskArray: [
      {
        taskId: "1",
        content: "lorem ipsum",
        status: "active",
        priority: Priority.p1,
      },
      {
        taskId: "2",
        content: "Go shopping",
        status: "completed",
        priority: Priority.p1,
      },
      {
        taskId: "3",
        content: "Start working",
        status: "completed",
        priority: Priority.p1,
      },
    ],
    taskFilter: "all",
    isLoading: false,
    errorMessage: "",
    editMode: {
      active: false,
      id: "",
    },
  },
};

beforeEach(() => {
  jest.spyOn(todoApi, "deleteTask").mockImplementation((taskId: string) =>
    Promise.resolve({
      taskId: taskId,
      content: "Go shopping",
      status: "completed",
      priority: Priority.p1,
    })
  );

  jest
    .spyOn(todoApi, "addTask")
    .mockImplementation((listId: string, newTask: TaskContent) =>
      Promise.resolve({
        taskId: "4",
        content: newTask.content || "",
        status: "active",
        priority: Priority.p1,
      })
    );

  jest
    .spyOn(todoApi, "updateTask")
    .mockImplementation((taskId: string, changes: TaskContent) =>
      Promise.resolve({
        taskId: taskId,
        content: "Go shopping",
        status: changes.status || "completed",
        priority: Priority.p1,
      })
    );
});

describe("Task Container", () => {
  test("renders task container", () => {
    renderWithState(<TaskContainer />, todoState);
    expect(
      screen.getByPlaceholderText(/Create a new todo.../i)
    ).toBeInTheDocument();
    expect(screen.getByText(/All/i)).toBeInTheDocument();
    expect(screen.getByText(/lorem ipsum/i)).toBeInTheDocument();
  });

  test("adds task to list", async () => {
    renderWithState(<TaskContainer />, todoState);
    const input = screen.getByPlaceholderText(/Create a new todo.../i);
    fireEvent.change(input, { target: { value: "New task" } });
    fireEvent.click(screen.getByRole("button", { name: "add" }));

    expect(await screen.findByText(/New task/i)).toBeInTheDocument();
  });

  test("deletes task from list", async () => {
    renderWithState(<TaskContainer />, todoState);

    fireEvent.click(screen.getByTestId("cross-button-2"));
    await waitFor(() => {
      expect(screen.queryByText(/Go shopping/i)).not.toBeInTheDocument();
    });
  });

  test("changes tasks status from complete to active", async () => {
    renderWithState(<TaskContainer />, todoState);

    fireEvent.click(screen.getByTestId("task-button-2"));
    await waitFor(() => {
      expect(screen.getByTestId("task-button-2")).toHaveClass("border-blue");
    });
  });
});
