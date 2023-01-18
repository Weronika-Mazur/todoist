import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TaskCreator from "../TaskCreator";
import { render } from "test/testHelpers";

describe("Task Creator", () => {
  test("renders loading animation when started", () => {
    render(<TaskCreator isLoading={true} />);

    expect(
      screen.queryByPlaceholderText(/Create a new todo.../i)
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("busy-icon")).toBeInTheDocument();
  });

  test("renders task creator when not loading", () => {
    render(<TaskCreator isLoading={false} />);

    expect(
      screen.getByPlaceholderText(/Create a new todo.../i)
    ).toBeInTheDocument();
    expect(screen.queryByTestId("busy-icon")).not.toBeInTheDocument();
  });
});
