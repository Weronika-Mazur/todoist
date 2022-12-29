import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { faker } from "@faker-js/faker";

import TaskEdit from "../TaskEdit";
import { render } from "test/testHelpers";
import { Priority, Task } from "types/todo";
import { listGenerator, todoGenerator, userGenerator } from "test/generators";
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

describe("Task Edit", () => {
  test("renders task edit", () => {
    const { testTask, testUser, testList } = generateTask();
    render(
      <TaskEdit
        content={testTask.content}
        taskId={testTask.taskId}
        listId={testTask.listId}
        priority={testTask.priority}
        filters={{ listId: testList?.listId }}
      />,
      { user: testUser }
    );
    expect(screen.getByDisplayValue(testTask.content)).toBeInTheDocument();
  });

  test("renders task edit details", () => {
    const { testTask, testUser, testList } = generateTask({
      dueDate: Date(),
      priority: Priority.P3,
    });

    render(
      <TaskEdit
        content={testTask.content}
        taskId={testTask.taskId}
        listId={testTask.listId}
        priority={testTask.priority}
        dueDate={toDate(testTask.dueDate)}
        filters={{ listId: testList?.listId }}
      />,
      { user: testUser }
    );
    expect(screen.getByDisplayValue(testTask.content)).toBeInTheDocument();
    expect(
      screen.getByText(getDateString(toDate(testTask.dueDate)) as string)
    ).toBeInTheDocument();
    expect(screen.getByText(/Priority 3/i)).toBeInTheDocument();
  });

  test("typing in input changes value", async () => {
    const { testTask, testUser, testList } = generateTask();
    const user = userEvent.setup();
    render(
      <TaskEdit
        content={testTask.content}
        taskId={testTask.taskId}
        listId={testTask.listId}
        priority={testTask.priority}
        filters={{ listId: testList?.listId }}
      />,
      { user: testUser }
    );
    expect(screen.getByDisplayValue(testTask.content)).toBeInTheDocument();

    const input = screen.getByDisplayValue(testTask.content);

    await user.click(input);
    const word = faker.lorem.word();
    await user.type(input, word);

    expect(
      screen.getByDisplayValue(`${testTask.content}${word}`)
    ).toBeInTheDocument();
  });
});
