import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import nock from "nock";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

import TaskList from "../TaskList";
import { render } from "test/testHelpers";
import { Task } from "types/todo";
import { listGenerator, todoGenerator, userGenerator } from "test/generators";

import { BASEURL } from "utils/constants";
import { endpoints } from "utils/endpoints";
import { accessControlHeaders } from "test/constants";

const generateTaskList = (overrides?: Partial<Task>) => {
  const testUser = userGenerator();
  const testList = listGenerator({
    inbox: true,
    name: "Inbox",
    owner: testUser.userId,
  });

  const testTask = todoGenerator({ listId: testList.listId, ...overrides });
  const testTaskList = [
    testTask,
    todoGenerator({ listId: testList.listId }),
    todoGenerator({ listId: testList.listId }),
  ];

  return { testTask, testUser, testList, testTaskList };
};

const renderTaskList = (overrides?: Partial<Task>) => {
  const { testTask, testUser, testList, testTaskList } =
    generateTaskList(overrides);
  nock.disableNetConnect();

  nock(BASEURL)
    .persist()
    .intercept(`/${endpoints.todos.getTasks}${testList.listId}`, "OPTIONS")
    .reply(200, undefined, accessControlHeaders)
    .get(`/${endpoints.todos.getTasks}${testList.listId}`)
    .reply(200, testTaskList, accessControlHeaders);

  render(<TaskList filters={{ listId: testList.listId }} />, {
    user: testUser,
  });

  return { testTask, testUser, testList, testTaskList };
};

describe("Task List", () => {
  test("render task list", async () => {
    const { testTaskList } = renderTaskList();

    expect(
      await screen.findByText(testTaskList[0].content)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(testTaskList[1].content)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(testTaskList[2].content)
    ).toBeInTheDocument();
  });

  test("activate edit mode", async () => {
    const user = userEvent.setup();
    const { testTask, testTaskList } = renderTaskList();

    expect(
      await screen.findByText(testTaskList[0].content)
    ).toBeInTheDocument();

    const button = screen.getByTestId(`edit-button-${testTask.taskId}`);
    await user.click(button);
    expect(screen.getByDisplayValue(testTask.content)).toBeInTheDocument();
  });

  test("deactivates edit mode", async () => {
    const user = userEvent.setup();
    const { testTask } = renderTaskList();

    expect(await screen.findByText(testTask.content)).toBeInTheDocument();

    const button = screen.getByTestId(`edit-button-${testTask.taskId}`);
    await user.click(button);
    expect(screen.getByDisplayValue(testTask.content)).toBeInTheDocument();

    await user.click(screen.getByText(/cancel/i));

    expect(screen.getByText(testTask.content)).toBeInTheDocument();
  });

  test("displays edited task", async () => {
    const user = userEvent.setup();
    const { testTask } = renderTaskList();

    const word = faker.lorem.word();
    const newTaskContent = `${testTask.content}${word}`;

    nock(BASEURL)
      .intercept(`/${endpoints.todos.updateTask}${testTask.taskId}`, "OPTIONS")
      .reply(200, undefined, accessControlHeaders)
      .put(
        `/${endpoints.todos.updateTask}${testTask.taskId}`,
        (body) => body.content === newTaskContent
      )
      .reply(
        200,
        { ...testTask, content: newTaskContent },
        accessControlHeaders
      );

    expect(await screen.findByText(testTask.content)).toBeInTheDocument();

    const button = screen.getByTestId(`edit-button-${testTask.taskId}`);
    await user.click(button);

    const input = screen.getByDisplayValue(testTask.content);

    await user.click(input);
    await user.type(input, word);

    await user.click(screen.getByText(/confirm/i));

    expect(await screen.findByText(newTaskContent)).toBeInTheDocument();
  });
});
