import { createContext } from "react";

export interface CardDataProps {
  id: string;
  name: string;
  isActive: boolean;
  category: string;
}

export const CategoriesContext = createContext<CardDataProps[]>([]);