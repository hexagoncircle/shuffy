import { FormEvent, SyntheticEvent, useState } from "react";
import { CardDataProps } from "@components/Card";
import CategorySelect from "./CategorySelect";

interface CardEditForm {
  card: CardDataProps;
  onCancel(): void;
  onDelete(id: string): void;
  onUpdate(card: CardDataProps): void;
}

export default function CardEditForm({ card, onCancel, onDelete, onUpdate }: CardEditForm) {
  const { id, name, category } = card;
  const [nameValue, setNameValue] = useState(name);
  const [categoryValue, setCategoryValue] = useState(category);

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    setNameValue(e.currentTarget.value);
  };

  const handleCategoryChange = (e: FormEvent<HTMLSelectElement>) => {
    setCategoryValue(e.currentTarget.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!nameValue) return;

    onUpdate({
      ...card,
      name: nameValue,
      category: categoryValue,
    });
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
        <CategorySelect
          id="edit-card-category"
          selectedValue={categoryValue}
          onChange={handleCategoryChange}
        />
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
