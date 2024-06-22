import { FormEvent, SyntheticEvent, useState } from "react";
import { CategoryProps } from "../contexts/CategoriesContext";
import { CardDataProps } from "./Card";
import { v4 as uuid } from "uuid";

interface AddCardFormProps {
  categories: CategoryProps[];
  addCard(card: CardDataProps): void;
}

export default function AddCardForm({ categories, addCard }: AddCardFormProps) {
  const [categorySelectValue, setCategorySelectValue] = useState(categories[0].name);
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleCategorySelect = (e: FormEvent<HTMLSelectElement>) => {
    setCategorySelectValue(e.currentTarget.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!inputValue) return;

    const newCard = {
      name: inputValue,
      category: categorySelectValue,
      id: uuid(),
      isActive: true,
    };

    addCard(newCard);
    setInputValue("");
  };

  return (
    <form id="add-card-form" onSubmit={handleSubmit} autoComplete="off">
      <div>
        <label htmlFor="add-card-name">Add new card</label>
        <input id="add-card-name" value={inputValue} type="text" onInput={handleInput} />
      </div>

      <div>
        <label htmlFor="add-card-category">Select category</label>
        <select id="add-card-category" onChange={handleCategorySelect}>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button>Add</button>
    </form>
  );
}
