import {
  KeyboardEvent,
  useMemo,
  useRef,
  useState,
  startTransition,
  addTransitionType,
  useEffect,
} from "react";
import { useCategoriesContext } from "@hooks/useCategoriesContext";
import CategoryCreator from "./CategoryCreator";
import CategoryStarter from "./CategoryStarter";
import PlusIcon from "@assets/plus.svg?react";
import Category from "./Category";
import { DragDropProvider } from "@dnd-kit/react";
import { VIEW_TRANSITIONS } from "@js/constants";

export default function Categories() {
  const { categories, reorderCategories, editCategoryId, setEditCategoryId } =
    useCategoriesContext();
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const hasCategories = categories.length > 0;
  const addCategoryButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLUListElement>(null);

  const categoryMap = useMemo(
    () => new Map(categories.map((category) => [category.id, category])),
    [categories]
  );

  const handleClose = (e: KeyboardEvent<HTMLElement>) => {
    if (editCategoryId && e.key === "Escape") {
      e.preventDefault();
      setEditCategoryId(null);
    }
  };

  const handleAddCategory = () => {
    setIsCreatingCategory(true);
    setEditCategoryId("new-category");
  };

  const handleAddCategoryComplete = () => {
    setIsCreatingCategory(false);
    setEditCategoryId(null);

    // Refocus "Add category" button
    requestAnimationFrame(() => {
      addCategoryButtonRef.current?.focus();
    });
  };

  const handleDragEnd = () => {
    if (!containerRef.current) return;

    const itemEls = [...containerRef.current.children] as HTMLElement[];

    // The new Set removes duplicate placeholder created by dnd-kit while dragging.
    const newOrderById = [...new Set([...itemEls].map((item) => item.id))];
    const currentOrderById = categories.map((category) => category.id);

    // If order hasn't changed, do nothing.
    if (currentOrderById.every((id, index) => id === newOrderById[index])) {
      return;
    }

    const reorderedItems = newOrderById
      .map((id) => categoryMap.get(id))
      .filter((item) => item !== undefined);

    startTransition(() => {
      addTransitionType(VIEW_TRANSITIONS.none);
      reorderCategories(reorderedItems);
    });
  };

  return (
    <>
      {hasCategories ? (
        <ul
          ref={containerRef}
          className="category-list"
          role="list"
          onKeyDown={handleClose}
        >
          <DragDropProvider onDragEnd={handleDragEnd}>
            {categories.map((category, index) => (
              <Category
                key={category.id}
                sortId={category.id}
                index={index}
                category={category}
              />
            ))}
          </DragDropProvider>
        </ul>
      ) : null}
      {isCreatingCategory ? (
        <CategoryCreator onComplete={handleAddCategoryComplete} />
      ) : hasCategories ? (
        <button
          ref={addCategoryButtonRef}
          type="button"
          className="primary small center"
          onClick={handleAddCategory}
        >
          <PlusIcon /> Add a category
        </button>
      ) : (
        <CategoryStarter
          ref={addCategoryButtonRef}
          onClick={handleAddCategory}
        />
      )}
    </>
  );
}
