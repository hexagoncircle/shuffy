import { ReactNode, createContext, useReducer } from "react";
import categoriesReducer from "@reducers/categoriesReducer";

// Testing data
import CATEGORIES from "@data/categories.json";

export interface CategoryDataProps {
  id: string;
  value: string;
  label: string;
  theme: string;
}

interface CategoriesProviderProps {
  children: ReactNode;
}

interface CategoriesContextType {
  categories: CategoryDataProps[];
  createCategory: (category: CategoryDataProps) => void;
  updateCategory: (category: CategoryDataProps) => void;
  deleteCategory: (id: string) => void;
  deleteAllCategories: () => void;
  reorderCategories: (data: CategoryDataProps[]) => void;
}

export const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  createCategory: () => { },
  updateCategory: () => { },
  deleteCategory: () => { },
  deleteAllCategories: () => { },
  reorderCategories: () => { },
});

export default function CategoriesProvider({ children }: CategoriesProviderProps) {
  const [categories, dispatch] = useReducer(categoriesReducer, CATEGORIES);

  const createCategory = (category: CategoryDataProps) => {
    dispatch({
      type: "CATEGORY_CREATED",
      category,
    });
  };

  const updateCategory = (category: CategoryDataProps) => {
    dispatch({
      type: "CATEGORY_UPDATED",
      category,
    });
  };

  const deleteCategory = (id: string) => {
    dispatch({
      type: "CATEGORY_DELETED",
      id,
    });
  };

  const deleteAllCategories = () => {
    dispatch({ type: "CATEGORIES_ALL_DELETED" });
  };

  const reorderCategories = (data: CategoryDataProps[]) => {
    dispatch({
      type: "CATEGORIES_REORDER",
      data,
    });
  };

  const value: CategoriesContextType = {
    categories,
    createCategory,
    updateCategory,
    deleteCategory,
    deleteAllCategories,
    reorderCategories
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
