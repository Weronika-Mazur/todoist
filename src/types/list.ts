export interface List {
  listId: string;
  name: string;
  owner?: string;
  color: ListColors;
  activeCount: number;
  inbox?: boolean | null;
}

export interface ListContent {
  name: string;
  color: ListColors;
}

export interface SelectedList {
  id: string;
  name: string;
  color: ListColors;
}

export enum ListColors {
  GREEN = "GREEN",
  SKY = "SKY",
  VIOLET = "VIOLET",
  FUCHSIA = "FUCHSIA",
  ROSE = "ROSE",
}
