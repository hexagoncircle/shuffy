import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useCategoriesContext } from "@hooks/useCategoriesContext";
import CategoryCreator from "./CategoryCreator";
import CategoryStarter from "./CategoryStarter";
import PlusIcon from "@assets/plus.svg?react";
import Category from "./Category";
import useDraggable from "@hooks/useDraggable";

export default function Categories() {
  const { categories, reorderCategories } = useCategoriesContext();
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [editingCategoryIndex, setEditingCategoryIndex] = useState(-1);
  const isEditing = editingCategoryIndex !== -1;
  const hasCategories = categories.length > 0;
  const addCategoryButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLUListElement>(null);
  const activeElementRef = useRef<HTMLElement | null>(null);
  const categoriesRef = useRef<(HTMLLIElement | null)[]>([]);

  const handleEdit = (index: number) => {
    setEditingCategoryIndex(index);
    activeElementRef.current = categoriesRef.current[index];
  }

  const handleClose = (e: KeyboardEvent<HTMLElement>) => {
    if (isEditing && e.key === "Escape") {
      e.preventDefault();
      setEditingCategoryIndex(-1);
    }
  }

  const handleDelete = () => {
    setEditingCategoryIndex(-1);
    addCategoryButtonRef.current?.focus();
  }

  const updateCategoryOrder = (arr: number[]) => {
    const reorderedItems = arr.map((index) => categories[index]);
    reorderCategories(reorderedItems);
  };

  // Update category order via drag and drop
  useDraggable({
    containerRef,
    onDragEnd: updateCategoryOrder,
    dragHandle: '.grippy'
  });

  useEffect(() => {
    // Refocus "Add category" button if category create action is canceled
    if (!isCreatingCategory) {
      addCategoryButtonRef.current?.focus();
    }
  }, [isCreatingCategory]);

  useEffect(() => {
    /**
     * Restore focus to the category label when no longer editing
     * If category was deleted, focus "Add category" button instead
     */
    if (!isEditing) {
      const btn = activeElementRef.current?.querySelector("button");

      btn ? btn.focus() : addCategoryButtonRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <>
      {hasCategories ? (
        <section>
          <ul ref={containerRef} className="category-list flow flow-s" role="list" onKeyDown={handleClose}>
            {categories.map((category, index) => (
              <Category
                key={category.id}
                ref={el => {
                  (categoriesRef.current[index] = el);
                }}
                category={category}
                isEditing={index === editingCategoryIndex}
                onIsEditing={() => handleEdit(index)}
                onComplete={() => setEditingCategoryIndex(-1)}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        </section>
      ) : null}
      {isCreatingCategory ? (
        <CategoryCreator onComplete={() => setIsCreatingCategory(false)} />
      ) : hasCategories ? (
        <button
          ref={addCategoryButtonRef}
          type="button"
          className="primary small center"
          onClick={() => setIsCreatingCategory(true)}
        >
          <PlusIcon /> Add a category
        </button>
      ) : (
        <CategoryStarter ref={addCategoryButtonRef} onClick={() => setIsCreatingCategory(true)} />
      )}
    </>
  )
}