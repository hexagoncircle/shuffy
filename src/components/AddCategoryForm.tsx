import { FormEvent, SyntheticEvent, useState } from "react";
import { CategoryProps } from "../contexts/CategoriesContext";

interface AddCategoryFormProps {
  categories: CategoryProps[];
  addCategory(value: string): void;
}

export default function AddCategoryForm({ categories, addCategory }: AddCategoryFormProps) {
  const [inputValue, setInputValue] = useState("");
  const [isError, setIsError] = useState(false);

  const ifCategoryExists = (value: string) => {
    return categories.some(
      (category: CategoryProps) => category.name.toLowerCase() === value.toLowerCase()
    );
  };

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);

    if (isError) {
      setIsError(false);
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (ifCategoryExists(inputValue)) {
      setIsError(true);
      return;
    }

    if (!inputValue) return;

    addCategory(inputValue);
    setInputValue("");
  };

  return (
    <section className="flow">
      <form id="add-category-form" onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label htmlFor="add-category">Add new category</label>
          <input
            id="add-category"
            type="text"
            value={inputValue}
            onInput={handleInput}
            aria-labelledby="add-category-hint"
          />
        </div>
        <button>Add</button>
        {isError && (
          <div id="add-category-hint" className="hint">
            Category already exists!
          </div>
        )}
      </form>

      <ul style={{ columnCount: 2, paddingInlineStart: "1em" }}>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </section>
  );
}
