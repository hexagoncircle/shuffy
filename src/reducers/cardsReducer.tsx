import { CardDataProps } from "@contexts/CardsContext";

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

export default function cardsReducer(cards: CardDataProps[], action: CardActions) {
  switch (action.type) {
    case "CARD_CREATED": {
      return [...cards, action.card];
    }
    case "CARD_UPDATED": {
      return cards.map((card) => {
        if (card.id === action.card.id) {
          return action.card;
        } else {
          return card;
        }
      });
    }
    case "CARD_DELETED": {
      return cards.filter((card) => card.id !== action.id);
    }
    case "CARDS_ALL_DELETED": {
      return [];
    }
  }
}
