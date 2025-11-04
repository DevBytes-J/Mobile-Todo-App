// src/types.ts

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type ThemeType = "light" | "dark";

export type FilterType = "all" | "active" | "completed";
