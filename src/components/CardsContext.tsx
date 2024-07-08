import { ReactNode, createContext, useReducer } from "react";
import cardsReducer from "@reducers/cardsReducer";

// Testing data
import CARDS from "@data/cards.json";

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
  createCard: (card: CardDataProps) => void;
  updateCard: (card: CardDataProps) => void;
  deleteCard: (id: string) => void;
}

export const CardsContext = createContext<CardsContextType>({
  cards: [],
  createCard: () => { },
  updateCard: () => { },
  deleteCard: () => { },
});

export default function CardsProvider({ children }: CardsProviderProps) {
  const [cards, dispatch] = useReducer(cardsReducer, []);

  const createCard = (card: CardDataProps) => {
    console.log("CARDS_CREATED", card);

    dispatch({
      type: "CARDS_CREATED",
      card,
    });
  };

  const updateCard = (card: CardDataProps) => {
    console.log("CARDS_UPDATED", card);

    dispatch({
      type: "CARDS_UPDATED",
      card,
    });
  };

  const deleteCard = (id: string) => {
    console.log("CARDS_DELETED", cards.find((card) => card.id === id));

    dispatch({
      type: "CARDS_DELETED",
      id,
    });
  };

  const value: CardsContextType = {
    cards,
    createCard,
    updateCard,
    deleteCard
  };

  return (
    <CardsContext.Provider value={value}>
      {children}
    </CardsContext.Provider>
  );
}
