import { CardDataProps } from "@/components/Card";

type CreatedAction = {
  type: "created";
  card: CardDataProps;
};

type UpdatedAction = {
  type: "updated";
  card: CardDataProps;
};

type DeletedAction = {
  type: "deleted";
  id: string;
};

type Actions = CreatedAction | UpdatedAction | DeletedAction;

export default function cardsReducer(cards: CardDataProps[], action: Actions) {
  switch (action.type) {
    case "created": {
      return [...cards, action.card];
    }
    case "updated": {
      return cards.map((card) => {
        if (card.id === action.card.id) {
          return action.card;
        } else {
          return card;
        }
      });
    }
    case "deleted": {
      return cards.filter((card) => card.id !== action.id);
    }
  }
}
