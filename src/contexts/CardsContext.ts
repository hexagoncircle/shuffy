import { createContext } from "react";

export interface CardDataProps {
  name: string;
  isActive: boolean;
  category: string;
}

export const CardsContext = createContext<CardDataProps[]>([]);
