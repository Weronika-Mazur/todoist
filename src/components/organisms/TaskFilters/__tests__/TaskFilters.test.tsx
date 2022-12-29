import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import nock from "nock";

import { Task } from "types/todo";
import { listGenerator, todoGenerator, userGenerator } from "test/generators";

import { BASEURL } from "utils/constants";
import { endpoints } from "utils/endpoints";

import TaskFilterBar from "../TaskFilterBar";
import { render } from "test/testHelpers";
import { accessControlHeaders } from "test/constants";

const generateTaskList = () => {
  const testUser = userGenerator();
  const testList = listGenerator({
    inbox: true,
    name: "Inbox",
    owner: testUser.userId,
  });

  const testTaskList = [
    todoGenerator({ listId: testList.listId }),
    todoGenerator({ listId: testList.listId }),
    todoGenerator({ listId: testList.listId }),
    todoGenerator({ listId: testList.listId }),
    todoGenerator({ listId: testList.listId }),
  ];

  return { testUser, testList, testTaskList };
};

describe("Task Filters", () => {
  test("renders task filters", () => {
    render(<TaskFilterBar enabled={false} />);
    expect(screen.getByText(/All/i)).toBeInTheDocument();
    expect(screen.getByText(/0 items left/i)).toBeInTheDocument();
    expect(screen.getByText(/Clear completed/i)).toBeInTheDocument();
  });

  test("renders All option with active classes", () => {
    render(<TaskFilterBar enabled={false} />);
    expect(screen.getByText(/All/i)).toHaveClass("text-blue");
  });

  test("renders not active options with default classes", () => {
    render(<TaskFilterBar enabled={false} />);
    expect(screen.getByText(/Active/i)).not.toHaveClass("text-blue");
  });

  test("renders active option with active classes", async () => {
    const user = userEvent.setup();

    render(<TaskFilterBar enabled={false} />);

    await user.click(screen.getByText(/Active/i));
    expect(screen.getByText(/All/i)).not.toHaveClass("text-blue");
    expect(screen.getByText(/Active/i)).toHaveClass("text-blue");
  });

  test("displays active todos count", async () => {
    const { testUser, testList, testTaskList } = generateTaskList();

    nock.disableNetConnect();

    nock(BASEURL)
      .persist()
      .intercept(`/${endpoints.todos.getTasks}${testList.listId}`, "OPTIONS")
      .reply(200, undefined, accessControlHeaders)
      .get(`/${endpoints.todos.getTasks}${testList.listId}`)
      .reply(200, testTaskList, accessControlHeaders);

    render(<TaskFilterBar filters={{ listId: testList.listId }} />, {
      user: testUser,
    });

    const itemsCounter = testTaskList.filter(
      (task: Task) => task.status === "active"
    ).length;
    expect(
      await screen.findByText(`${itemsCounter} items left`)
    ).toBeInTheDocument();
  });
});
