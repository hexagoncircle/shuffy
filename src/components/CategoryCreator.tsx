import { CSSProperties, FormEvent, KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import slugify from "slugify";
import { v4 as uuid } from "uuid";
import { CategoriesContext, CategoryDataProps } from "@components/CategoriesContext";
import ColorPicker from "./ColorPicker";
import GripIcon from "@assets/grip.svg?react";
import COLORS from "@data/colors.theme.json";
import "@css/category.css";

export interface CategoryProps {
  category: CategoryDataProps;
}

const getRandomColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)].value;
}

interface CategoryCreatorProps {
  onComplete(): void;
}

export default function CategoryCreator({ onComplete }: CategoryCreatorProps) {
  const { createCategory } = useContext(CategoriesContext);
  const [color, setColor] = useState(getRandomColor());
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerKeydown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onComplete();
    }
  }

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (e.currentTarget.value) {
        handleSaveClick();
        onComplete();
      }
    }
  }

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  const handleSaveClick = () => {
    createCategory({
      id: uuid(),
      label: inputValue,
      value: slugify(inputValue, { lower: true }),
      theme: color
    })
    onComplete();
  }

  return (
    <div className="category-creator category box" style={{ "--theme": color } as CSSProperties} onKeyDown={handleContainerKeydown}>
      <section className="category-content">
        <GripIcon className="grip" />
        <label htmlFor="add-category-label" className="visually-hidden">Category</label>
        <input
          ref={inputRef}
          id="add-category-label"
          className="compact"
          type="text"
          autoFocus
          autoComplete="off"
          placeholder="Enter a category title..."
          defaultValue={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeydown}
        />
        <div className="dot"></div>
      </section>
      <section className="category-editor">
        <ColorPicker onChange={(color) => setColor(color)} defaultColor={color} />
        <footer className="category-editor-actions cluster">
          <button type="button" className="cancel-button text small" onClick={() => onComplete()}>Cancel</button>
          <button type="button" className="primary small" onClick={handleSaveClick} disabled={!inputValue}>Add category</button>
        </footer>
      </section>
    </div>
  )
}