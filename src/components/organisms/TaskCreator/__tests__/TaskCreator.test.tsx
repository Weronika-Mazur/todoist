import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TaskCreator from "../TaskCreator";
import { renderWithState } from "utils/testHelpers";

const todoState = {
  todo: {
    taskArray: [],
    taskFilter: "all",
    isLoading: false,
    errorMessage: "",
    editMode: {
      active: false,
      id: "",
    },
  },
};

describe("Task Creator", () => {
  test("renders loading animation when started", () => {
    renderWithState(<TaskCreator />);
    expect(
      screen.queryByPlaceholderText(/Create a new todo.../i)
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("busy-icon")).toBeInTheDocument();
  });

  test("renders task creator when not loading", () => {
    renderWithState(<TaskCreator />, todoState);
    expect(
      screen.getByPlaceholderText(/Create a new todo.../i)
    ).toBeInTheDocument();
    expect(screen.queryByTestId("busy-icon")).not.toBeInTheDocument();
  });
});
