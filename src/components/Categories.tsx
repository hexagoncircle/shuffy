import { KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import { CategoriesContext } from "./CategoriesContext";
import CategoryCreator from "./CategoryCreator";
import CategoryStarter from "./CategoryStarter";
import PlusIcon from "@assets/plus.svg?react";
import Category from "./Category";
import { useClickAway } from "@uidotdev/usehooks";

export default function Categories() {
  const { categories } = useContext(CategoriesContext);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [editingCategoryIndex, setEditingCategoryIndex] = useState(-1);
  const ref = useClickAway<HTMLUListElement>(() => setEditingCategoryIndex(-1));
  const addCategoryButtonRef = useRef<HTMLButtonElement>(null);
  const activeElementRef = useRef<HTMLElement | null>(null);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);
  const hasCategories = categories.length > 0;

  const handleEdit = (index: number) => {
    setEditingCategoryIndex(index);
    activeElementRef.current = categoriesRef.current[index];
  }

  const handleClose = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setEditingCategoryIndex(-1);
    }
  }

  const handleDelete = () => {
    setEditingCategoryIndex(-1);
    addCategoryButtonRef.current?.focus();
  }

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
    if (editingCategoryIndex === -1) {
      const btn = activeElementRef.current?.querySelector("button");

      btn ? btn.focus() : addCategoryButtonRef.current?.focus();
    }
  }, [editingCategoryIndex]);

  return (
    <>
      {hasCategories ? (
        <ul ref={ref} className="flow flow-s" role="list" onKeyDown={handleClose}>
          {categories.map((category, index) => (
            <li key={category.id}>
              <Category
                ref={el => (categoriesRef.current[index] = el)}
                category={category}
                isEditing={index === editingCategoryIndex}
                onIsEditing={() => handleEdit(index)}
                onComplete={() => setEditingCategoryIndex(-1)}
                onDelete={handleDelete}
              />
            </li>
          ))}
        </ul>
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