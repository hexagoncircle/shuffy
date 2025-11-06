import { ReactNode, createContext, useReducer, useState } from "react";
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
  editCategoryId: string | null;
  setEditCategoryId: (id: string | null) => void;
  createCategory: (category: CategoryDataProps) => void;
  updateCategory: (category: CategoryDataProps) => void;
  deleteCategory: (id: string) => void;
  deleteAllCategories: () => void;
  reorderCategories: (data: CategoryDataProps[]) => void;
}

export const CategoriesContext = createContext<CategoriesContextType | null>(null);

export default function CategoriesProvider({ children }: CategoriesProviderProps) {
  const [categories, dispatch] = useReducer(categoriesReducer, CATEGORIES);
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);

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
    editCategoryId,
    setEditCategoryId,
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
