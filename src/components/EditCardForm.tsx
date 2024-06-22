import { FormEvent, SyntheticEvent, useContext, useState } from "react";
import { CardDataProps } from "./Card";
import { CategoriesContext, CategoryProps } from "../contexts/CategoriesContext";

interface EditCardForm {
  card: CardDataProps;
  onCancel(): void;
  onDelete(id: string): void;
  onUpdate(card: CardDataProps): void;
}

export default function EditCardForm({ card, onCancel, onDelete, onUpdate }: EditCardForm) {
  const { id, name, category } = card;

  const categoryList = useContext<CategoryProps[]>(CategoriesContext);
  const [inputValue, setInputValue] = useState(name);
  const [categorySelectValue, setCategorySelectValue] = useState(category);

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleCategorySelect = (e: FormEvent<HTMLSelectElement>) => {
    setCategorySelectValue(e.currentTarget.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!inputValue) return;

    const updatedCard = {
      ...card,
      name: inputValue,
      category: categorySelectValue,
    };

    onUpdate(updatedCard);
  };

  return (
    <form
      id="edit-card-form"
      method="dialog"
      className="cluster"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div>
        <label htmlFor="edit-card-name">Name</label>
        <input
          id="edit-card-name"
          type="text"
          required
          autoFocus
          value={inputValue}
          onChange={handleInput}
        />
      </div>

      <div>
        <label htmlFor="edit-card-category">Category</label>
        <select id="edit-card-category" value={categorySelectValue} onChange={handleCategorySelect}>
          {categoryList.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="cluster">
        <button type="submit">Update</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </form>
  );
}
