import { faker } from "@faker-js/faker";
import { List, ListColors } from "types/list";
import { Tag } from "types/tag";
import { Task } from "types/todo";
import { User } from "types/type";

export const userGenerator = (overrides?: Partial<User>): User => ({
  userName: faker.internet.userName(),
  userId: faker.datatype.uuid(),
  email: faker.internet.email(),
  ...overrides,
});

export const todoGenerator = (overrides?: Partial<Task>): Task => ({
  taskId: faker.datatype.uuid(),
  listId: faker.datatype.uuid(),
  content: faker.lorem.words(),
  status: faker.helpers.arrayElement(["completed", "active"]),
  priority: faker.datatype.number({ min: 1, max: 5 }),
  ...overrides,
});

export const listGenerator = (overrides?: Partial<List>): List => ({
  owner: faker.datatype.uuid(),
  listId: faker.datatype.uuid(),
  name: faker.lorem.words(),
  color: faker.helpers.arrayElement(Object.values(ListColors)),
  activeCount: 0,
  ...overrides,
});

export const tagGenerator = (overrides?: Partial<Tag>): Tag => ({
  owner: faker.datatype.uuid(),
  tagId: faker.datatype.uuid(),
  content: faker.lorem.words(),
  ...overrides,
});
