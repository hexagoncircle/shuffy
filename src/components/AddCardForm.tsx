import { FormEvent, SyntheticEvent, useState } from "react";
import { CategoryProps } from "../contexts/CategoriesContext";

interface AddCardFormProps {
  categories: CategoryProps[];
  addCard(name: string, category: string): void;
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

    addCard(inputValue, categorySelectValue);
    setInputValue("");
  };

  return (
    <form id="add-card-form" onSubmit={handleSubmit} autoComplete="off">
      <div>
        <label htmlFor="add-card">Add new card</label>
        <input id="add-card" value={inputValue} type="text" onInput={handleInput} />
      </div>

      <div>
        <label htmlFor="select-category">Category</label>
        <select id="select-category" onChange={handleCategorySelect}>
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
