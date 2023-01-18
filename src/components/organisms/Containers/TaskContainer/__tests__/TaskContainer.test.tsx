import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import nock from "nock";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

import TaskContainer from "../TaskContainer";
import { render } from "test/testHelpers";
import { Priority, Task } from "types/todo";
import { listGenerator, todoGenerator, userGenerator } from "test/generators";

import { BASEURL } from "utils/constants";
import { endpoints } from "utils/endpoints";
import { TaskContent } from "types/todo";
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

const renderTaskContainer = (overrides?: Partial<Task>) => {
  const { testTask, testUser, testList, testTaskList } =
    generateTaskList(overrides);
  nock.disableNetConnect();

  nock(BASEURL)
    .persist()
    .intercept(`/${endpoints.list.getLists}`, "OPTIONS")
    .reply(200, undefined, accessControlHeaders)
    .get(`/${endpoints.list.getLists}`)
    .reply(200, [testList], accessControlHeaders);

  nock(BASEURL)
    .persist()
    .intercept(`/${endpoints.todos.getTasks}${testList.listId}`, "OPTIONS")
    .reply(200, undefined, accessControlHeaders)
    .get(`/${endpoints.todos.getTasks}${testList.listId}`)
    .reply(200, testTaskList, accessControlHeaders);

  render(
    <MemoryRouter initialEntries={["/home/"]}>
      <TaskContainer />
    </MemoryRouter>,
    {
      user: testUser,
    }
  );

  return { testTask, testUser, testList, testTaskList };
};

describe("Task Container", () => {
  test("renders task container", async () => {
    const { testTaskList } = renderTaskContainer();
    expect(
      await screen.findByPlaceholderText(/Create a new todo.../i)
    ).toBeInTheDocument();
    expect(screen.getByText(/All/i)).toBeInTheDocument();
    expect(
      await screen.findByText(testTaskList[0].content)
    ).toBeInTheDocument();
  });

  test("adds task to list", async () => {
    const user = userEvent.setup();
    const newTaskContent = faker.lorem.words();

    const { testTaskList, testList } = renderTaskContainer();
    expect(
      await screen.findByText(testTaskList[0].content)
    ).toBeInTheDocument();

    const endpoint = `/${endpoints.todos.addTask}${testList.listId}`;

    nock(BASEURL)
      .intercept(endpoint, "OPTIONS")
      .reply(200, undefined, accessControlHeaders)
      .post(endpoint, (body: TaskContent) => body.content === newTaskContent)
      .reply(
        200,
        (uri: string, requestBody: TaskContent) => ({
          listId: testList.listId,
          taskId: faker.datatype.uuid(),
          content: newTaskContent,
          status: "active",
          priority: Priority.P1,
          ...requestBody,
        }),
        accessControlHeaders
      );

    const input = await screen.findByPlaceholderText(/Create a new todo.../i);
    await user.click(input);
    await user.type(input, newTaskContent);
    await user.click(screen.getByRole("button", { name: "add" }));

    expect(await screen.findByText(newTaskContent)).toBeInTheDocument();
  });

  test("deletes task from list", async () => {
    const user = userEvent.setup();
    const { testTaskList } = renderTaskContainer();
    expect(
      await screen.findByText(testTaskList[0].content)
    ).toBeInTheDocument();

    const endpoint = `/${endpoints.todos.deleteTask}${testTaskList[1].taskId}`;

    nock(BASEURL)
      .intercept(endpoint, "OPTIONS")
      .reply(200, undefined, accessControlHeaders)
      .delete(endpoint)
      .reply(200, testTaskList[1], accessControlHeaders);

    await user.click(
      screen.getByTestId(`cross-button-${testTaskList[1].taskId}`)
    );

    await waitFor(() => {
      expect(
        screen.queryByText(testTaskList[1].content)
      ).not.toBeInTheDocument();
    });
  });

  test("changes tasks status from complete to active", async () => {
    const user = userEvent.setup();
    const { testTask } = renderTaskContainer({
      status: "completed",
      priority: Priority.P1,
    });
    expect(await screen.findByText(testTask.content)).toBeInTheDocument();

    const endpoint = `/${endpoints.todos.updateTask}${testTask.taskId}`;

    nock(BASEURL)
      .intercept(endpoint, "OPTIONS")
      .reply(200, undefined, accessControlHeaders)
      .put(endpoint)
      .reply(
        200,
        (uri: string, requestBody: TaskContent) => ({
          ...testTask,
          ...requestBody,
        }),
        accessControlHeaders
      );

    const taskButton = screen.getByTestId(`task-button-${testTask.taskId}`);

    await user.click(taskButton);

    await waitFor(() => {
      expect(taskButton).toHaveClass("border-blue");
    });
  });

  test("clears completed tasks from list", async () => {
    const user = userEvent.setup();
    const { testTaskList, testList, testTask } = renderTaskContainer({
      status: "completed",
    });
    expect(
      await screen.findByText(testTaskList[0].content)
    ).toBeInTheDocument();

    const endpoint = `/${endpoints.todos.clearTasks}${testList.listId}`;
    const deletedTasks = testTaskList.filter(
      (task: Task) => task.status === "completed"
    );

    nock(BASEURL)
      .intercept(endpoint, "OPTIONS")
      .reply(200, undefined, accessControlHeaders)
      .delete(endpoint)
      .reply(200, deletedTasks, accessControlHeaders);

    await user.click(screen.getByText("Clear completed"));

    await waitFor(() => {
      expect(screen.queryByText(testTask.content)).not.toBeInTheDocument();
    });
  });
});
