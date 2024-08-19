import { Actions } from "./actions";

export interface Column {
    name: string;
    title: string;
    columnAttrs?: { [key: string]: any };
    headerAttrs?: { [key: string]: any };
    titleIconAttrs?: { [key: string]: any };
    sortColumn?: string;
    action?: Actions
  }
  