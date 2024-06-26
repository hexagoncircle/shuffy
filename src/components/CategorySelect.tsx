import { FormEvent, useContext } from "react";
import { CategoriesContext, CategoryProps } from "@/contexts/CategoriesContext";

interface CategorySelect {
  id: string;
  selectedValue: string;
  onChange(e: FormEvent<HTMLSelectElement>): void;
}

export default function CategorySelect({ id, selectedValue, onChange }: CategorySelect) {
  const categories = useContext<CategoryProps[]>(CategoriesContext);

  return (
    <select id={id} onChange={onChange} value={selectedValue}>
      {categories.map((category) => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
