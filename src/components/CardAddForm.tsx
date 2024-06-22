import { FormEvent, SyntheticEvent, useState } from "react";
import { CardDataProps } from "@components/Card";
import { v4 as uuid } from "uuid";
import CategorySelect from "./CategorySelect";

interface CardAddFormProps {
  onCreate(card: CardDataProps): void;
}

export default function CardAddForm({ onCreate }: CardAddFormProps) {
  const [nameValue, setNameValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  const handleNameInput = (e: FormEvent<HTMLInputElement>) => {
    setNameValue(e.currentTarget.value);
  };

  const handleCategoryChange = (e: FormEvent<HTMLSelectElement>) => {
    setCategoryValue(e.currentTarget.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!nameValue) return;

    const newCard = {
      name: nameValue,
      category: categoryValue,
      id: uuid(),
      isActive: true,
    };

    onCreate(newCard);
    setNameValue("");
  };

  return (
    <form id="add-card-form" onSubmit={handleSubmit} autoComplete="off">
      <div>
        <label htmlFor="add-card-name">Add new card</label>
        <input id="add-card-name" type="text" onInput={handleNameInput} />
      </div>

      <div>
        <label htmlFor="add-card-category">Select category</label>
        <CategorySelect
          id="add-card-category"
          selectedValue={categoryValue}
          onChange={handleCategoryChange}
        />
      </div>
      <button>Add</button>
    </form>
  );
}
