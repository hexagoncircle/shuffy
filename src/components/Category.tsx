import { CategoryDataProps } from "@contexts/CategoriesContext";
import { CSSProperties } from "react";
import GripIcon from "@assets/grip.svg?react";
import "@css/category.css";

export interface CategoryProps {
  category: CategoryDataProps;
}

export default function Category({ category }: CategoryProps) {
  const { label, theme } = category;

  return (
    <div className="category box" style={{ "--theme": theme } as CSSProperties}>
      <GripIcon className="grip" />
      {label}
      <div className="dot"></div>
    </div>
  )
}