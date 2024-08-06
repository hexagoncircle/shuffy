import { CategoryDataProps } from "@components/CategoriesContext";

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

type Actions = CreatedAction | UpdatedAction | DeletedAction | AllDeletedAction | ReorderAction;

export default function categoriesReducer(categories: CategoryDataProps[], action: Actions) {
  switch (action.type) {
    case "CATEGORY_CREATED": {
      console.log("CATEGORY_CREATED", action.category);

      return [...categories, action.category];
    }

    case "CATEGORY_UPDATED": {
      console.log("CATEGORY_UPDATED", action.category);

      return categories.map((category) => {
        if (category.id === action.category.id) {
          return action.category;
        } else {
          return category;
        }
      });
    }

    case "CATEGORY_DELETED": {
      console.log("CATEGORY_DELETED", categories.find(({ id }) => action.id === id));

      return categories.filter((category) => category.id !== action.id);
    }

    case "CATEGORIES_ALL_DELETED": {
      console.log("CATEGORIES_ALL_DELETED", categories);

      return [];
    }

    case "CATEGORIES_REORDER": {
      console.log("CATEGORIES_REORDER", action.data);

      return categories = [...action.data];
    }
  }
}
