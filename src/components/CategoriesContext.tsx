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
}

export const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  createCategory: () => { },
  updateCategory: () => { },
  deleteCategory: () => { },
});

export default function CategoriesProvider({ children }: CategoriesProviderProps) {
  const [state, dispatch] = useReducer(categoriesReducer, []);

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

  const value: CategoriesContextType = {
    categories: state,
    createCategory,
    updateCategory,
    deleteCategory
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
