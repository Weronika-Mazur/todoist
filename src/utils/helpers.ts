import { Priority } from "types/type";
import { TaskFilters } from "../types/type";

export const getPriorityArray = () => {
  const priorityArray = Object.keys(Priority).filter((v) =>
    isNaN(Number(v))
  ) as (keyof typeof Priority)[];

  const priorityValuesArray = priorityArray.map((key) => {
    return Priority[key];
  });

  return priorityValuesArray;
};

export const toDate = (date?: string) => (date ? new Date(date) : undefined);

export const getDateString = (dueDate?: Date) =>
  dueDate?.toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const getTodayString = () => {
  const now = new Date();
  return now.toLocaleDateString("en-CA");
};

export const getTomorrowString = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toLocaleDateString("en-CA");
};

export const getEndpointUrl = (
  endpoint: string,
  listId: string,
  filters?: TaskFilters
) => {
  const filterParams = filters
    ? new URLSearchParams([...Object.entries(filters)])
    : "";

  const endpointUrl = `${endpoint}${listId}`;

  const url = filterParams ? `${endpointUrl}?${filterParams}` : endpointUrl;

  return url;
};
