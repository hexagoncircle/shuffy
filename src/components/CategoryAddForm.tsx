import { FormEvent, SyntheticEvent, useState } from "react";
import { CategoryProps } from "@/contexts/CategoriesContext";

interface CategoryAddFormProps {
  categories: CategoryProps[];
  addCategory(value: string): void;
}

export default function CategoryAddForm({ categories, addCategory }: CategoryAddFormProps) {
  const [categoryValue, setCategoryValue] = useState("");
  const [isError, setIsError] = useState(false);

  const ifCategoryExists = (value: string) => {
    return categories.some(
      (category: CategoryProps) => category.name.toLowerCase() === value.toLowerCase()
    );
  };

  const handleCategoryInput = (e: FormEvent<HTMLInputElement>) => {
    setCategoryValue(e.currentTarget.value);

    // Remove error message when typing resumes
    if (isError) {
      setIsError(false);
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (ifCategoryExists(categoryValue)) {
      setIsError(true);
      return;
    }

    if (!categoryValue) return;

    addCategory(categoryValue);
    setCategoryValue("");
  };

  return (
    <form id="add-category-form" onSubmit={handleSubmit} autoComplete="off">
      <div>
        <label htmlFor="add-category">Add new category</label>
        <input
          id="add-category"
          type="text"
          value={categoryValue}
          onInput={handleCategoryInput}
          aria-labelledby="add-category-hint"
        />
      </div>
      <button>Add</button>
      {isError && (
        <div id="add-category-hint" className="hint">
          This category already exists.
        </div>
      )}
    </form>
  );
}
