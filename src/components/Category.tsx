import {
  CSSProperties,
  KeyboardEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import slugify from "slugify";
import { CategoryDataProps } from "@contexts/CategoriesContext";
import ColorPicker from "./ColorPicker";
import GripIcon from "@assets/grip.svg?react";
import { useCategoriesContext } from "@hooks/useCategoriesContext";
import { useCardsContext } from "@hooks/useCardsContext";
import { useConfirmModalContext } from "@hooks/useConfirmModalContext";
import { useSortable } from "@dnd-kit/react/sortable";
import { useOnClickOutside } from "usehooks-ts";
import mergeRefs from "merge-refs";
import "@css/category.css";
import { useFocusTrap } from "@hooks/useFocusTrap";

export interface CategoryProps {
  category: CategoryDataProps;
  sortId: string;
  index: number;
}

const Category = ({ category, index }: CategoryProps) => {
  const {
    categories,
    updateCategory,
    deleteCategory,
    editCategoryId,
    setEditCategoryId,
  } = useCategoriesContext();
  const { id, label, theme } = category;
  const isEditing = editCategoryId === id;
  const containerRef = useRef<HTMLElement>(null);
  const focusTrapRef = useFocusTrap<HTMLElement>(isEditing);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const grippyRef = useRef<HTMLDivElement>(null);
  const { ref: sortRef } = useSortable({
    id,
    index,
    handle: grippyRef,
    disabled: !!editCategoryId,
  });
  const { cards } = useCardsContext();
  const { modalContext, setModalContext } = useConfirmModalContext();
  const [colorValue, setColorValue] = useState(theme);
  const [inputValue, setInputValue] = useState(label);
  const slugifiedValue = slugify(inputValue, { lower: true });
  const isDuplicate = categories.find(
    (c) => c.id !== id && c.value === slugifiedValue
  );
  const categoryCards = cards.filter((card) => card.category === id);

  const handleEscapeCancel = (e: KeyboardEvent<HTMLElement>) => {
    if (isEditing && e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (e.currentTarget.value && !isDuplicate) {
        handleSave();
      }
    }
  };

  const setIsEditing = (edit: boolean) => {
    setEditCategoryId(edit ? id : null);

    requestAnimationFrame(() => {
      (edit ? nameInputRef : editButtonRef).current?.focus();
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    const performDelete = () => {
      deleteCategory(category.id);
      setIsEditing(false);
    };

    if (categoryCards.length <= 0) {
      performDelete();
      return;
    }

    setModalContext({
      isOpen: true,
      title: "Heads up!",
      message: `${categoryCards.length} of your cards are categorized under <strong>${label}</strong>. They'll be uncategorized for now but you can always set a new category.`,
      actionConfirmText: "Got it, delete this category",
      actionCancelText: "Cancel",
      onConfirm: performDelete,
    });
  };

  const handleSave = () => {
    if (isDuplicate) {
      return;
    }

    updateCategory({
      ...category,
      label: inputValue,
      value: slugify(inputValue, { lower: true }),
      theme: colorValue,
    });
    setIsEditing(false);
  };

  useOnClickOutside(
    containerRef as RefObject<HTMLElement>,
    () => {
      // Avoid closing editor if modal present
      if (isEditing && !modalContext.isOpen) {
        setIsEditing(false);
      }
    },
    "mouseup"
  );

  useEffect(() => {
    if (!isEditing) {
      setInputValue(label);
    }
  }, [isEditing]);

  return (
    <li
      ref={
        mergeRefs(
          sortRef,
          containerRef,
          focusTrapRef
        ) as React.Ref<HTMLLIElement>
      }
      id={id}
      className="category box"
      style={{ "--theme": colorValue } as CSSProperties}
      onKeyDown={handleEscapeCancel}
    >
      <section className="category-content">
        <div ref={grippyRef} className="grippy" tabIndex={-1}>
          <GripIcon className="icon" aria-hidden="true" />
          <span className="visually-hidden">Drag to reorder</span>
        </div>
        {!isEditing ? (
          <button
            ref={editButtonRef}
            type="button"
            className="category-edit-button break-words"
            onClick={() => setIsEditing(true)}
          >
            {label}
          </button>
        ) : (
          <>
            <label htmlFor={`category-edit-${id}`} className="visually-hidden">
              Category
            </label>
            <input
              ref={nameInputRef}
              id={`category-edit-${id}`}
              className={clsx(
                "category-input compact",
                isDuplicate && "is-error"
              )}
              type="text"
              required
              autoComplete="off"
              placeholder="Enter a category title..."
              defaultValue={inputValue}
              onChange={(e) => setInputValue(e.currentTarget.value)}
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
          <ColorPicker
            onChange={(color) => setColorValue(color)}
            defaultColor={theme}
          />
          <footer className="category-editor-actions cluster">
            <button
              type="button"
              className="danger small"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="cancel-button text small"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="primary small"
              onClick={handleSave}
              disabled={!inputValue || !!isDuplicate}
            >
              Save changes
            </button>
          </footer>
        </section>
      )}
    </li>
  );
};

export default Category;
