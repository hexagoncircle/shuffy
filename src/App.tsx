import { useReducer, useState } from "react";
import { v4 as uuid } from "uuid";
import { CategoriesContext } from "./contexts/CategoriesContext";
import { CardDataProps } from "./components/Card";
import cardsReducer from "./reducers/cardsReducer";
import AddCategoryForm from "./components/AddCategoryForm";
import AddCardForm from "./components/AddCardForm";
import Deck from "./components/Deck";
import GetCardForm from "./components/GetCardForm";
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
    const newCategory = { id: uuid(), name };

    setCategories([...categories, newCategory]);
  };

  const addCard = (card: CardDataProps) => {
    dispatch({
      type: "added",
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
      <AddCardForm categories={categories} addCard={addCard} />
      <AddCategoryForm categories={categories} addCategory={addCategory}></AddCategoryForm>
      <CategoriesContext.Provider value={categories}>
        <Deck cards={cards} updateCard={updateCard} deleteCard={deleteCard} />
      </CategoriesContext.Provider>
      <GetCardForm cards={activeCards}></GetCardForm>
    </main>
  );
}

export default App;
