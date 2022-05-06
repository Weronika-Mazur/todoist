import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TaskEdit from "../TaskEdit";
import { renderWithState } from "utils/testHelpers";

describe("Task Edit", () => {
  test("renders task edit", () => {
    renderWithState(<TaskEdit content="lorem ipsum" id="1" />);
    expect(screen.getByDisplayValue(/lorem ipsum/i)).toBeInTheDocument();
  });
});
