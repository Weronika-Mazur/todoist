import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TaskItem from "../TaskItem";
import { render } from "test/testHelpers";
import { Priority, Task } from "types/todo";
import {
  listGenerator,
  tagGenerator,
  todoGenerator,
  userGenerator,
} from "test/generators";

import { getDateString, toDate } from "utils/helpers";

const generateTask = (overrides?: Partial<Task>) => {
  const testUser = userGenerator();
  const testList = listGenerator({
    inbox: true,
    name: "Inbox",
    owner: testUser.userId,
  });

  const testTask = todoGenerator({ listId: testList?.listId, ...overrides });

  return { testTask, testUser, testList };
};

describe("Task Item", () => {
  test("renders task", () => {
    const { testTask, testUser, testList } = generateTask();
    render(
      <TaskItem
        content={testTask.content}
        taskId={testTask.taskId}
        status={testTask.status}
        listId={testTask.listId}
        priority={testTask.priority}
        filters={{ listId: testList?.listId }}
      />,
      { user: testUser }
    );
    expect(screen.getByText(testTask.content)).toBeInTheDocument();
  });

  test("renders task details due date", () => {
    const { testTask, testUser, testList } = generateTask({ dueDate: Date() });
    render(
      <TaskItem
        content={testTask.content}
        taskId={testTask.taskId}
        status={testTask.status}
        listId={testTask.listId}
        priority={testTask.priority}
        dueDate={toDate(testTask.dueDate)}
        filters={{ listId: testList?.listId }}
      />,
      { user: testUser }
    );
    expect(screen.getByText(testTask.content)).toBeInTheDocument();
    expect(
      screen.getByText(getDateString(toDate(testTask.dueDate)) as string)
    ).toBeInTheDocument();
  });

  test("renders task details tags", () => {
    const { testTask, testUser, testList } = generateTask();
    const testTag = tagGenerator({ owner: testUser.userId });

    render(
      <TaskItem
        content={testTask.content}
        taskId={testTask.taskId}
        status={testTask.status}
        listId={testTask.listId}
        priority={testTask.priority}
        tags={[testTag]}
        filters={{ listId: testList?.listId }}
      />,
      { user: testUser }
    );

    expect(screen.getByText(testTask.content)).toBeInTheDocument();
    expect(screen.getByText(testTag.content)).toBeInTheDocument();
  });

  test("renders an active task with active styles", () => {
    const { testTask, testUser, testList } = generateTask({
      status: "active",
      priority: Priority.P1,
    });
    render(
      <TaskItem
        content={testTask.content}
        taskId={testTask.taskId}
        status={testTask.status}
        listId={testTask.listId}
        priority={testTask.priority}
        filters={{ listId: testList?.listId }}
      />,
      { user: testUser }
    );

    expect(screen.getByTestId(`task-button-${testTask.taskId}`)).toHaveClass(
      "border-blue"
    );
  });

  test("renders a complete task with complete styles", () => {
    const { testTask, testUser, testList } = generateTask({
      status: "completed",
    });
    render(
      <TaskItem
        content={testTask.content}
        taskId={testTask.taskId}
        status={testTask.status}
        listId={testTask.listId}
        priority={testTask.priority}
        filters={{ listId: testList?.listId }}
      />,
      { user: testUser }
    );

    expect(screen.getByText(testTask.content)).toHaveClass("text-main-500");
    expect(screen.getByTestId(`task-button-${testTask.taskId}`)).toHaveClass(
      "border-main-500"
    );
  });
});
