import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TaskList from "../TaskList";
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
  jest
    .spyOn(todoApi, "updateTask")
    .mockImplementation((taskId: string, changes: TaskContent) =>
      Promise.resolve({
        taskId: taskId,
        content: changes.content || "",
        status: "completed",
        priority: Priority.p1,
      })
    );
});

describe("Task List", () => {
  test("render task list", () => {
    renderWithState(<TaskList />, todoState);
    expect(screen.getByText(/lorem ipsum/i)).toBeInTheDocument();
    expect(screen.getByText(/Go shopping/i)).toBeInTheDocument();
    expect(screen.getByText(/Start working/i)).toBeInTheDocument();
  });

  test("activate edit mode", () => {
    renderWithState(<TaskList />, todoState);
    fireEvent.click(screen.getByTestId("edit-button-2"));
    expect(screen.getByDisplayValue(/Go shopping/i)).toBeInTheDocument();
  });

  test("deactivates edit mode", () => {
    renderWithState(<TaskList />, todoState);
    fireEvent.click(screen.getByTestId("edit-button-2"));
    fireEvent.click(screen.getByText(/cancel/i));

    expect(screen.getByText(/Go shopping/i)).toBeInTheDocument();
  });

  test("displays edited task", async () => {
    renderWithState(<TaskList />, todoState);
    fireEvent.click(screen.getByTestId("edit-button-2"));

    const input = screen.getByDisplayValue(/Go shopping/i);
    fireEvent.change(input, { target: { value: "Go shopping tomorrow" } });
    fireEvent.click(screen.getByText(/confirm/i));

    expect(
      await screen.findByText(/Go shopping tomorrow/i)
    ).toBeInTheDocument();
  });
});
