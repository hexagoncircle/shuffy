import { CSSProperties, FormEvent, KeyboardEvent, forwardRef, useContext, useEffect, useRef, useState } from "react";
import slugify from "slugify";
import { CategoriesContext, CategoryDataProps } from "@components/CategoriesContext";
import ColorPicker from "./ColorPicker";
import GripIcon from "@assets/grip.svg?react";
import "@css/category.css";
import clsx from "clsx";

export interface CategoryProps {
  category: CategoryDataProps;
  isEditing?: boolean;
  onIsEditing(): void;
  onComplete(): void;
  onDelete(): void;
}

const Category = forwardRef<HTMLDivElement, CategoryProps>(({ category, isEditing, onIsEditing, onComplete, onDelete }, ref) => {
  const { categories, updateCategory, deleteCategory } = useContext(CategoriesContext);
  const { id, label, theme } = category;
  const [colorValue, setColorValue] = useState(theme);
  const [inputValue, setInputValue] = useState(label);
  const inputRef = useRef<HTMLInputElement>(null);
  const slugifiedValue = slugify(inputValue, { lower: true });
  const isDuplicate = categories.find(c => c.id !== id && c.value === slugifiedValue);

  const handleCancel = () => {
    setColorValue(theme);
    setInputValue(label);
    onComplete();
  }

  const handleEscapeCancel = (e: KeyboardEvent<HTMLElement>) => {
    if (isEditing && e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  }

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isEditing && e.key === "Enter" && !isDuplicate) {
      e.preventDefault();

      if (e.currentTarget.value) {
        handleSave();
      }
    }
  }

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  const handleEdit = () => {
    onIsEditing();
  }

  const handleSave = () => {
    if (isDuplicate) return;

    updateCategory({
      ...category,
      label: inputValue,
      value: slugify(inputValue, { lower: true }),
      theme: colorValue
    })
    onComplete();
  }

  const handleDelete = () => {
    deleteCategory(category.id)
    onDelete();
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div
      ref={ref}
      className="category box"
      style={{ "--theme": colorValue } as CSSProperties}
      onKeyDown={handleEscapeCancel}
    >
      <section className="category-content">
        <GripIcon className="grip icon" aria-hidden="true" />
        {!isEditing ? (
          <button
            type="button"
            className="category-edit-button break-words"
            onClick={handleEdit}
          >
            {label}
          </button>
        ) : (
          <>
            <label htmlFor={`category-edit-${id}`} className="visually-hidden">Category</label>
            <input
              ref={inputRef}
              id={`category-edit-${id}`}
              className={clsx("category-input compact", isDuplicate && "is-error")}
              type="text"
              required
              autoComplete="off"
              placeholder="Enter a category title..."
              defaultValue={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeydown}
            />
            <div className="category-hint hint" hidden={!isDuplicate}>This category already exists</div>
          </>
        )}
        <div className="dot"></div>
      </section>
      {isEditing ? (
        <section className="category-editor">
          <ColorPicker onChange={(color) => setColorValue(color)} defaultColor={theme} />
          <footer className="category-editor-actions cluster">
            <button type="button" className="danger small" onClick={handleDelete}>Delete</button>
            <button type="button" className="cancel-button text small" onClick={handleCancel}>Cancel</button>
            <button type="button" className="primary small" onClick={handleSave} disabled={!inputValue}>Save changes</button>
          </footer>
        </section>
      ) : null}
    </div>
  )
})

export default Category;