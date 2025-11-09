import { ReactNode, createContext, useReducer, useState, useMemo } from "react";
import cardsReducer from "@reducers/cardsReducer";
import { useCategoriesContext } from "@hooks/useCategoriesContext";

// Testing data
import CARDS from "@data/deck.json";

export interface CardDataProps {
  id: string;
  label: string;
  isActive: boolean;
  category: string;
  categoryLabel?: string;
  categoryTheme?: string;
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

export const CardsContext = createContext<CardsContextType | null>(null);

export default function CardsProvider({ children }: CardsProviderProps) {
  const { categories } = useCategoriesContext();
  const [cards, dispatch] = useReducer(
    (state: CardDataProps[], action: Parameters<typeof cardsReducer>[1]) =>
      cardsReducer(state, action, categories),
    CARDS
  );
  const [editCardId, setEditCardId] = useState("");

  const cardsWithCategoryInfo = useMemo(() => {
    return cards.map(card => {
      const categoryObj = categories.find(c => c.id === card.category);

      return {
        ...card,
        categoryLabel: categoryObj?.label,
        categoryTheme: categoryObj?.theme,
      };
    });
  }, [cards, categories]);

  const createCard = (card: CardDataProps) => {
    dispatch({
      type: "CARD_CREATED",
      card,
    });
  };

  const updateCard = (card: CardDataProps) => {
    dispatch({
      type: "CARD_UPDATED",
      card,
    });
  };

  const deleteCard = (id: string) => {
    dispatch({
      type: "CARD_DELETED",
      id,
    });
  };

  const deleteAllCards = () => {
    dispatch({ type: "CARDS_ALL_DELETED" });
  };

  const value: CardsContextType = {
    cards: cardsWithCategoryInfo,
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
