import { FormEvent } from "react";
import { useCategoriesContext } from "@hooks/useCategoriesContext";

interface CategorySelect {
  id: string;
  selectedValue: string;
  onChange(e: FormEvent<HTMLSelectElement>): void;
}

export default function CategorySelect({ id, selectedValue, onChange }: CategorySelect) {
  const { categories } = useCategoriesContext();

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
