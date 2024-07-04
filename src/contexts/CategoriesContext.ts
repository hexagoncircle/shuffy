import { createContext } from "react";

export interface CategoryProps {
  value: string;
  label: string;
}

export const CategoriesContext = createContext<CategoryProps[]>([]);
