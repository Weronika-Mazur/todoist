import { ListColors, Priority } from "types/type";

export const Colors = {
  [ListColors.green]: "fill-green-400",
  [ListColors.sky]: "fill-sky-400",
  [ListColors.violet]: "fill-violet-400",
  [ListColors.fuchsia]: "fill-fuchsia-400",
  [ListColors.rose]: "fill-rose-400",
};

export const PriorityColors = {
  [Priority.p1]: "fill-blue",
  [Priority.p2]: "fill-lime-400",
  [Priority.p3]: "fill-yellow-400",
  [Priority.p4]: "fill-orange-400",
  [Priority.p5]: "fill-red-400",
};

export const PriorityBorderColors = {
  [Priority.p1]: "border-blue",
  [Priority.p2]: "border-lime-400",
  [Priority.p3]: "border-yellow-400",
  [Priority.p4]: "border-orange-400",
  [Priority.p5]: "border-red-400",
};
