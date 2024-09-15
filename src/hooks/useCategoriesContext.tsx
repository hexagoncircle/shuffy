import { useContext } from "react";
import { CategoriesContext } from "@contexts/CategoriesContext";

export const useCategoriesContext = () => {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error(
      "useCategoriesContext has to be used within <CategoriesProvider>"
    );
  }

  return context;
};