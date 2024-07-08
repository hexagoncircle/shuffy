import { CardDataProps } from "@components/CardsContext";

type CreatedAction = {
  type: "CARDS_CREATED";
  card: CardDataProps;
};

type UpdatedAction = {
  type: "CARDS_UPDATED";
  card: CardDataProps;
};

type DeletedAction = {
  type: "CARDS_DELETED";
  id: string;
};

type Actions = CreatedAction | UpdatedAction | DeletedAction;

export default function cardsReducer(cards: CardDataProps[], action: Actions) {
  switch (action.type) {
    case "CARDS_CREATED": {
      return [...cards, action.card];
    }
    case "CARDS_UPDATED": {
      return cards.map((card) => {
        if (card.id === action.card.id) {
          return action.card;
        } else {
          return card;
        }
      });
    }
    case "CARDS_DELETED": {
      return cards.filter((card) => card.id !== action.id);
    }
  }
}
