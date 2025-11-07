import { CardDataProps } from "@contexts/CardsContext";
import { CategoryDataProps } from "@contexts/CategoriesContext";
import { debugLog } from "@js/debug";

type CreatedAction = {
  type: "CARD_CREATED";
  card: CardDataProps;
};

type UpdatedAction = {
  type: "CARD_UPDATED";
  card: CardDataProps;
};

type DeletedAction = {
  type: "CARD_DELETED";
  id: string;
};

type AllDeletedAction = {
  type: "CARDS_ALL_DELETED";
};

type CardActions = CreatedAction | UpdatedAction | DeletedAction | AllDeletedAction;

export default function cardsReducer(cards: CardDataProps[], action: CardActions, categories: CategoryDataProps[] = []) {
  const getCategoryLabel = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.label || categoryId;
  };

  switch (action.type) {
    case "CARD_CREATED": {
      debugLog("CARD_CREATED", {
        ...action.card,
        category: getCategoryLabel(action.card.category),
      });

      return [...cards, action.card];
    }
    case "CARD_UPDATED": {
      debugLog("CARD_UPDATED", {
        ...action.card,
        category: getCategoryLabel(action.card.category)
      });

      return cards.map((card) => {
        if (card.id === action.card.id) {
          return action.card;
        } else {
          return card;
        }
      });
    }
    case "CARD_DELETED": {
      debugLog("CARD_DELETED", () => {
        const deletedCard = cards.find((card) => card.id === action.id);

        return deletedCard ? {
          ...deletedCard,
          category: getCategoryLabel(deletedCard.category)
        } : null
      });

      return cards.filter((card) => card.id !== action.id);
    }
    case "CARDS_ALL_DELETED": {
      debugLog("CARDS_ALL_DELETED");

      return [];
    }
  }
}
