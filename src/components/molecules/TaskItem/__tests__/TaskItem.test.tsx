import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TaskItem from "../TaskItem";
import { renderWithState } from "utils/testHelpers";

describe("Task Item", () => {
  test("renders task", () => {
    renderWithState(<TaskItem content="lorem ipsum" id="1" status="active" />);
    expect(screen.getByText(/lorem ipsum/i)).toBeInTheDocument();
  });

  test("renders an active task with active styles", () => {
    renderWithState(<TaskItem content="lorem ipsum" id="1" status="active" />);
    expect(screen.getByTestId("task-button-1")).toHaveClass("border-blue");
  });

  test("renders a complete task with complete styles", () => {
    renderWithState(
      <TaskItem content="lorem ipsum" id="1" status="completed" />
    );

    expect(screen.getByText(/lorem ipsum/i)).toHaveClass("text-main-500");
    expect(screen.getByTestId("task-button-1")).toHaveClass("border-main-500");
  });
});
