import { ReactNode, createContext, useReducer, useState } from "react";
import cardsReducer from "@reducers/cardsReducer";

// Testing data
import CARDS from "@data/deck.json";

export interface CardDataProps {
  id: string;
  label: string;
  isActive: boolean;
  category: string;
}

interface CardsProviderProps {
  children: ReactNode;
}

interface CardsContextType {
  cards: CardDataProps[];
  editCardId: string;
  createCard: (card: CardDataProps) => void;
  updateCard: (card: CardDataProps) => void;
  deleteCard: (id: string) => void;
  deleteAllCards: () => void;
  setEditCardId: (id: string) => void;
}

export const CardsContext = createContext<CardsContextType>({
  cards: [],
  editCardId: "",
  createCard: () => { },
  updateCard: () => { },
  deleteCard: () => { },
  deleteAllCards: () => { },
  setEditCardId: () => { }
});

export default function CardsProvider({ children }: CardsProviderProps) {
  const [cards, dispatch] = useReducer(cardsReducer, CARDS);
  const [editCardId, setEditCardId] = useState("");

  const createCard = (card: CardDataProps) => {
    console.log("CARD_CREATED", card);

    dispatch({
      type: "CARD_CREATED",
      card,
    });
  };

  const updateCard = (card: CardDataProps) => {
    console.log("CARD_UPDATED", card);

    dispatch({
      type: "CARD_UPDATED",
      card,
    });
  };

  const deleteCard = (id: string) => {
    console.log("CARD_DELETED", cards.find((card) => card.id === id));

    dispatch({
      type: "CARD_DELETED",
      id,
    });
  };

  const deleteAllCards = () => {
    console.log("CARD_ALL_DELETED", cards);

    dispatch({ type: "CARDS_ALL_DELETED" });
  };

  const value: CardsContextType = {
    cards,
    editCardId,
    createCard,
    updateCard,
    deleteCard,
    deleteAllCards,
    setEditCardId
  };

  return (
    <CardsContext.Provider value={value}>
      {children}
    </CardsContext.Provider>
  );
}
