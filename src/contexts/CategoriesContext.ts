import { createContext } from "react";

export interface CategoryProps {
  id: string;
  name: string;
}

export const CategoriesContext = createContext<CategoryProps[]>([]);
