import { ListColors } from "types/list";
import { Priority } from "types/todo";

export const Colors = {
  [ListColors.GREEN]: "fill-green-400",
  [ListColors.SKY]: "fill-sky-400",
  [ListColors.VIOLET]: "fill-violet-400",
  [ListColors.FUCHSIA]: "fill-fuchsia-400",
  [ListColors.ROSE]: "fill-rose-400",
};

export const PriorityColors = {
  [Priority.P1]: "fill-blue",
  [Priority.P2]: "fill-lime-400",
  [Priority.P3]: "fill-yellow-400",
  [Priority.P4]: "fill-orange-400",
  [Priority.P5]: "fill-red-400",
};

export const PriorityBorderColors = {
  [Priority.P1]: "border-blue",
  [Priority.P2]: "border-lime-400",
  [Priority.P3]: "border-yellow-400",
  [Priority.P4]: "border-orange-400",
  [Priority.P5]: "border-red-400",
};

export const headerJson = new Headers({ "content-type": "application/json" });

export const AppsQueryKeys = {
  lists: "lists",
  todos: "todos",
  tags: "tags",
  user: "user",
};
