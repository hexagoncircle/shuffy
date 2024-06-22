import { FormEvent, SyntheticEvent, useState } from "react";
import { CategoryProps } from "@/contexts/CategoriesContext";
import { CardDataProps } from "@components/Card";
import { v4 as uuid } from "uuid";

interface CardAddFormProps {
  categories: CategoryProps[];
  addCard(card: CardDataProps): void;
}

export default function CardAddForm({ categories, addCard }: CardAddFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0].name);

  const handleNameInput = (e: FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleCategoryChange = (e: FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!name) return;

    const newCard = {
      name: name,
      category: category,
      id: uuid(),
      isActive: true,
    };

    addCard(newCard);
    setName("");
  };

  return (
    <form id="add-card-form" onSubmit={handleSubmit} autoComplete="off">
      <div>
        <label htmlFor="add-card-name">Add new card</label>
        <input id="add-card-name" type="text" value={name} onInput={handleNameInput} />
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
