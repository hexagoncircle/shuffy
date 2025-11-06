import { CSSProperties, FormEvent, KeyboardEvent, useEffect, useRef, useState, RefObject } from "react";
import slugify from "slugify";
import { CategoryDataProps } from "@contexts/CategoriesContext";
import ColorPicker from "./ColorPicker";
import GripIcon from "@assets/grip.svg?react";
import "@css/category.css";
import clsx from "clsx";
import { useCategoriesContext } from "@hooks/useCategoriesContext";
import { useCardsContext } from "@hooks/useCardsContext";
import { useConfirmModalContext } from "@hooks/useConfirmModalContext";
import { useSortable } from '@dnd-kit/react/sortable';
import { useOnClickOutside } from "usehooks-ts";
import mergeRefs from "merge-refs";


export interface CategoryProps {
  category: CategoryDataProps;
  isEditing: boolean;
  onIsEditing(): void;
  onComplete(): void;
  onDelete(): void;
  sortId: string;
  index: number;
}

const Category = ({
  category,
  index,
}: CategoryProps) => {
  const { categories, updateCategory, deleteCategory, editCategoryId, setEditCategoryId } = useCategoriesContext();
  const { id, label, theme } = category;
  const isEditing = editCategoryId === id;
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const grippyRef = useRef<HTMLDivElement>(null);
  const { ref: sortRef } = useSortable({ id, index, handle: grippyRef, disabled: !!editCategoryId });
  const { cards } = useCardsContext();
  const { modalContext, setModalContext } = useConfirmModalContext();
  const [colorValue, setColorValue] = useState(theme);
  const [inputValue, setInputValue] = useState(label);
  const inputRef = useRef<HTMLInputElement>(null);
  const slugifiedValue = slugify(inputValue, { lower: true });
  const isDuplicate = categories.find(c => c.id !== id && c.value === slugifiedValue);
  const categoryCards = cards.filter(card => card.category === id);
  const containerRef = useRef<Element>(null);

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
    setEditCategoryId(id);
  }

  const handleSave = () => {
    if (isDuplicate) return;

    updateCategory({
      ...category,
      label: inputValue,
      value: slugify(inputValue, { lower: true }),
      theme: colorValue
    })
    setEditCategoryId(null);
  }

  const handleCancel = () => {
    setEditCategoryId(null);
  }

  const handleDelete = () => {
    deleteCategory(category.id);
    setEditCategoryId(null);
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
    } else {
      editButtonRef.current?.focus();
    }
  }, [isEditing]);

  useOnClickOutside(containerRef as RefObject<HTMLElement>, () => {
    if (isEditing && !modalContext.isOpen) {
      handleCancel();
    }
  }, "mouseup");

  return (
    <li
      ref={mergeRefs(sortRef, containerRef) as React.Ref<HTMLLIElement>}
      id={id}
      className="category box"
      style={{ "--theme": colorValue } as CSSProperties}
      onKeyDown={handleEscapeCancel}
    >
      <section className="category-content">
        <div ref={grippyRef} className="grippy" tabIndex={editCategoryId ? -1 : 0}>
          <GripIcon className="icon" aria-hidden="true" />
          <span className="visually-hidden">Drag to reorder</span>
        </div>
        {!isEditing ? (
          <button
            ref={editButtonRef}
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
    </li>
  )
}

export default Category;