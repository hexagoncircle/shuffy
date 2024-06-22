import { FormEvent, SyntheticEvent, useState } from "react";
import { CategoryProps } from "@/contexts/CategoriesContext";
import { CardDataProps } from "@components/Card";
import { v4 as uuid } from "uuid";

interface CardAddFormProps {
  categories: CategoryProps[];
  onCreate(card: CardDataProps): void;
}

export default function CardAddForm({ categories, onCreate }: CardAddFormProps) {
  const [nameValue, setNameValue] = useState("");
  const [categoryValue, setCategoryValue] = useState(categories[0].name);

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
        <input id="add-card-name" type="text" value={nameValue} onInput={handleNameInput} />
      </div>

      <div>
        <label htmlFor="add-card-category">Select category</label>
        <select id="add-card-category" onChange={handleCategoryChange}>
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
