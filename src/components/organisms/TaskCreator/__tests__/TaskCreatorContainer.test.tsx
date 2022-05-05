import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TaskCreatorContainer from "../TaskCreatorContainer";
import { renderWithState } from "utils/testHelpers";

describe("Task Creator", () => {
  test("renders task creator", () => {
    renderWithState(<TaskCreatorContainer />);
    expect(
      screen.getByPlaceholderText(/Create a new todo.../i)
    ).toBeInTheDocument();
  });
});
