import { CategoryDataProps } from "@contexts/CategoriesContext";
import { debugLog } from "@js/debug";

type CreatedAction = {
  type: "CATEGORY_CREATED";
  category: CategoryDataProps;
};

type UpdatedAction = {
  type: "CATEGORY_UPDATED";
  category: CategoryDataProps;
};

type DeletedAction = {
  type: "CATEGORY_DELETED";
  id: string;
};

type AllDeletedAction = {
  type: "CATEGORIES_ALL_DELETED";
};

type ReorderAction = {
  type: "CATEGORIES_REORDER";
  data: CategoryDataProps[];
};

type CategoryActions = CreatedAction | UpdatedAction | DeletedAction | AllDeletedAction | ReorderAction;

export default function categoriesReducer(categories: CategoryDataProps[], action: CategoryActions) {
  switch (action.type) {
    case "CATEGORY_CREATED": {
      debugLog("CATEGORY_CREATED", action.category);

      return [...categories, action.category];
    }

    case "CATEGORY_UPDATED": {
      debugLog("CATEGORY_UPDATED", action.category);

      return categories.map((category) => {
        if (category.id === action.category.id) {
          return action.category;
        } else {
          return category;
        }
      });
    }

    case "CATEGORY_DELETED": {
      debugLog("CATEGORY_DELETED", categories.find(({ id }) => action.id === id));

      return categories.filter((category) => category.id !== action.id);
    }

    case "CATEGORIES_ALL_DELETED": {
      debugLog("CATEGORIES_ALL_DELETED");

      return [];
    }

    case "CATEGORIES_REORDER": {
      debugLog("CATEGORIES_REORDER", action.data);

      return categories = [...action.data];
    }
  }
}
