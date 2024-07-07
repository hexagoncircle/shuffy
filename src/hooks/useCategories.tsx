import { useContext } from "react";
import { CategoriesContext } from "@components/CategoriesContext";

const useCategories = () => {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error("useCategories only available within CategoriesContext");
  }

  return context;
};

export default useCategories;