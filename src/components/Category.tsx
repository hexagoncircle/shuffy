import { CSSProperties, DragEvent, FormEvent, KeyboardEvent, forwardRef, useEffect, useRef, useState } from "react";
import slugify from "slugify";
import { CategoryDataProps } from "@contexts/CategoriesContext";
import ColorPicker from "./ColorPicker";
import GripIcon from "@assets/grip.svg?react";
import "@css/category.css";
import clsx from "clsx";
import { useCategoriesContext } from "@hooks/useCategoriesContext";
import { useCardsContext } from "@hooks/useCardsContext";
import { useConfirmModalContext } from "@hooks/useConfirmModalContext";

export type CategoryDragEvent = DragEvent<Element>;

export interface CategoryProps {
  category: CategoryDataProps;
  isEditing?: boolean;
  onIsEditing(): void;
  onComplete(): void;
  onDelete(): void;
  draggable: boolean;
  onDragStart(e: CategoryDragEvent): void;
  onDragEnter(e: CategoryDragEvent): void;
  onDragOver(e: CategoryDragEvent): void;
  onDragEnd(e: CategoryDragEvent): void;
  onDragLeave(e: CategoryDragEvent): void;
  onDrop(e: CategoryDragEvent): void;
}

const Category = forwardRef<HTMLLIElement, CategoryProps>(({
  category,
  isEditing,
  onIsEditing,
  onComplete,
  onDelete,
  draggable,
  onDragEnd,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDragStart,
  onDrop,
}, ref) => {
  const { categories, updateCategory, deleteCategory } = useCategoriesContext();
  const { cards } = useCardsContext();
  const { setModalContext } = useConfirmModalContext();
  const { id, label, theme } = category;
  const [colorValue, setColorValue] = useState(theme);
  const [inputValue, setInputValue] = useState(label);
  const inputRef = useRef<HTMLInputElement>(null);
  const slugifiedValue = slugify(inputValue, { lower: true });
  const isDuplicate = categories.find(c => c.id !== id && c.value === slugifiedValue);
  const categoryCards = cards.filter(card => card.category === id);

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

  const handleDeleteClick = () => {
    if (categoryCards.length) {
      setModalContext({
        isOpen: true,
        title: "Heads up!",
        message: `${categoryCards.length} of your cards are categorized under <strong>${label}</strong>. They’ll be uncategorized for now but you can always set a new category.`,
        actionConfirmText: "Got it, delete this category",
        actionCancelText: "Cancel",
        onConfirm: () => {
          handleDelete()
        }
      })
      return;
    }

    handleDelete();
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <li
      ref={ref}
      className="category box"
      style={{ "--theme": colorValue } as CSSProperties}
      onKeyDown={handleEscapeCancel}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      <section className="category-content">
        <GripIcon className="grip-icon icon" aria-hidden="true" />
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
            <div className="category-hint hint" hidden={!isDuplicate}>
              This category already exists
            </div>
          </>
        )}
        <div className="dot"></div>
      </section>

      {isEditing && (
        <section className="category-editor">
          <ColorPicker onChange={(color) => setColorValue(color)} defaultColor={theme} />
          <footer className="category-editor-actions cluster">
            <button type="button" className="danger small" onClick={handleDeleteClick}>Delete</button>
            <button type="button" className="cancel-button text small" onClick={handleCancel}>Cancel</button>
            <button type="button" className="primary small" onClick={handleSave} disabled={!inputValue}>Save changes</button>
          </footer>
        </section>
      )}
    </li >
  )
})

export default Category;