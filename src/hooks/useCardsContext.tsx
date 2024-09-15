import { useContext } from "react";
import { CardsContext } from "@contexts/CardsContext";

export const useCardsContext = () => {
  const context = useContext(CardsContext);

  if (!context) {
    throw new Error(
      "useCardsContext has to be used within <CardsProvider>"
    );
  }

  return context;
};