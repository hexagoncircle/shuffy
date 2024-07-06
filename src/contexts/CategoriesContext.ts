import { createContext } from "react";

export interface CategoryDataProps {
  value: string;
  label: string;
  theme: string;
}

export const CategoriesContext = createContext<CategoryDataProps[]>([]);
