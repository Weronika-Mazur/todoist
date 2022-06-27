import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TaskFilterBar from "../TaskFilterBar";
import { renderWithState } from "utils/testHelpers";

describe("Task Filters", () => {
  test("renders task filters", () => {
    renderWithState(<TaskFilterBar />);
    expect(screen.getByText(/All/i)).toBeInTheDocument();
    expect(screen.getByText(/0 items left/i)).toBeInTheDocument();
    expect(screen.getByText(/Clear completed/i)).toBeInTheDocument();
  });

  test("renders All option with active classes", () => {
    renderWithState(<TaskFilterBar />);
    expect(screen.getByText(/All/i)).toHaveClass("text-blue");
  });

  test("renders not active options with default classes", () => {
    renderWithState(<TaskFilterBar />);
    expect(screen.getByText(/Active/i)).not.toHaveClass("text-blue");
  });

  test("renders active option with active classes", () => {
    renderWithState(<TaskFilterBar />);
    fireEvent.click(screen.getByText(/Active/i));
    expect(screen.getByText(/All/i)).not.toHaveClass("text-blue");
    expect(screen.getByText(/Active/i)).toHaveClass("text-blue");
  });
});
