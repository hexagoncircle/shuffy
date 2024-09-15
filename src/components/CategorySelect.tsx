import { FormEvent, useContext } from "react";
import { CategoriesContext, CategoryDataProps } from "@contexts/CategoriesContext";

interface CategorySelect {
  id: string;
  selectedValue: string;
  onChange(e: FormEvent<HTMLSelectElement>): void;
}

export default function CategorySelect({ id, selectedValue, onChange }: CategorySelect) {
  const categories = useContext<CategoryDataProps[]>(CategoriesContext);

  return (
    <select id={id} onChange={onChange} value={selectedValue}>
      {categories.map((category) => (
        <option key={category.value} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  );
}
