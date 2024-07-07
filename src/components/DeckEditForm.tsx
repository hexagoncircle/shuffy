import { useReducer, useState } from "react";
import { v4 as uuid } from "uuid";
import slugify from "slugify";
import cardsReducer from "@reducers/cardsReducer";
import CategoryAddForm from "@components/CategoryAddForm";
import CardAddForm from "@components/CardAddForm";
import CardSelectForm from "@components/CardSelectForm";
import Deck from "@components/Deck.prototype";

/** Example data */
import CATEGORIES from "@data/categories.json";
import CARDS from "@data/cards.json";
import { CardDataProps } from "@contexts/CardsContext";

export default function DeckEditForm() {
  const [categories, setCategories] = useState(CATEGORIES);
  const [cards, dispatch] = useReducer(cardsReducer, CARDS);
  const activeCards = cards.filter((card) => card.isActive);

  const addCategory = (label: string) => {
    setCategories([
      ...categories,
      {
        id: uuid(),
        value: slugify(label),
        label,
        theme: "purple"
      },
    ]);
  };

  const createCard = (card: CardDataProps) => {
    dispatch({
      type: "created",
      card,
    });
  };

  const updateCard = (card: CardDataProps) => {
    dispatch({
      type: "updated",
      card,
    });
  };

  const deleteCard = (id: string) => {
    dispatch({
      type: "deleted",
      id,
    });
  };

  return (
    <main className="flow">
      <h1>Current deck</h1>
      <CardAddForm onCreate={createCard} />
      <section className="flow">
        <CategoryAddForm categories={categories} addCategory={addCategory}></CategoryAddForm>
        <ul className="multi-column" role="list">
          {categories.map(({ value, label }) => (
            <li key={value}>{label}</li>
          ))}
        </ul>
      </section>
      <Deck cards={cards} onDelete={deleteCard} onUpdate={updateCard} />
      <CardSelectForm cards={activeCards}></CardSelectForm>
    </main>
  );
}