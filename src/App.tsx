import { useReducer, useState } from "react";
import { v4 as uuid } from "uuid";
import { CategoriesContext } from "./contexts/CategoriesContext";
import { CardDataProps } from "./components/Card";
import cardsReducer from "./reducers/cardsReducer";
import CategoryAddForm from "./components/CategoryAddForm";
import CardAddForm from "./components/CardAddForm";
import CardSelectForm from "./components/CardSelectForm";
import Deck from "./components/Deck";
import "./css/reset.css";
import "./css/utils.css";
import "./App.css";

/** Example data */
import CATEGORIES from "./data/categories.json";
import CARDS from "./data/cards.json";

function App() {
  const [categories, setCategories] = useState(CATEGORIES);
  const [cards, dispatch] = useReducer(cardsReducer, CARDS);
  const activeCards = cards.filter((card) => card.isActive);

  const addCategory = (name: string) => {
    setCategories([
      ...categories,
      {
        id: uuid(),
        name,
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
      <CategoriesContext.Provider value={categories}>
        <CardAddForm onCreate={createCard} />
        <section className="flow">
          <CategoryAddForm categories={categories} addCategory={addCategory}></CategoryAddForm>
          <ul className="multi-column" role="list">
            {categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </section>
        <Deck cards={cards} onDelete={deleteCard} onUpdate={updateCard} />
        <CardSelectForm cards={activeCards}></CardSelectForm>
      </CategoriesContext.Provider>
    </main>
  );
}

export default App;
