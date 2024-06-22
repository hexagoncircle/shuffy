import { FormEvent, SyntheticEvent, useContext, useState } from "react";
import { CardDataProps } from "@components/Card";
import { CategoriesContext, CategoryProps } from "@/contexts/CategoriesContext";

interface CardEditForm {
  card: CardDataProps;
  onCancel(): void;
  onDelete(id: string): void;
  onUpdate(card: CardDataProps): void;
}

export default function CardEditForm({ card, onCancel, onDelete, onUpdate }: CardEditForm) {
  const { id, name, category } = card;
  const categories = useContext<CategoryProps[]>(CategoriesContext);
  const [nameValue, setNameValue] = useState(name);
  const [categoryValue, setCategoryValue] = useState(category);

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    setNameValue(e.currentTarget.value);
  };

  const handleCategorySelect = (e: FormEvent<HTMLSelectElement>) => {
    setCategoryValue(e.currentTarget.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!nameValue) return;

    const updatedCard = {
      ...card,
      name: nameValue,
      category: categoryValue,
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
          value={nameValue}
          onChange={handleInput}
        />
      </div>

      <div>
        <label htmlFor="edit-card-category">Category</label>
        <select id="edit-card-category" value={categoryValue} onChange={handleCategorySelect}>
          {categories.map((category) => (
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
