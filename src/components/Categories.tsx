import { KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import { CategoriesContext } from "./CategoriesContext";
import CategoryCreator from "./CategoryCreator";
import CategoryStarter from "./CategoryStarter";
import PlusIcon from "@assets/plus.svg?react";
import Category, { CategoryDragEvent } from "./Category";
import { useClickAway } from "@uidotdev/usehooks";

export default function Categories() {
  const { categories, reorderCategories } = useContext(CategoriesContext);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [editingCategoryIndex, setEditingCategoryIndex] = useState(-1);
  const isEditing = editingCategoryIndex !== -1;
  const hasCategories = categories.length > 0;

  const addCategoryButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLUListElement>(null);
  const activeElementRef = useRef<HTMLElement | null>(null);
  const categoriesRef = useRef<(HTMLLIElement | null)[]>([]);
  const dragRef = useRef<number>(0);
  const dragTargetRef = useRef<number>(0);
  const [dragIndex, setDragIndex] = useState(0);
  const clickAwayRef = useClickAway<HTMLUListElement>(() => setEditingCategoryIndex(-1));

  const handleSort = (e: CategoryDragEvent) => {
    const target = e.target as HTMLElement;
    const arr = [...categories];
    const temp = arr[dragRef.current];

    // Swap index of drag item and its target
    arr[dragRef.current] = arr[dragTargetRef.current];
    arr[dragTargetRef.current] = temp
    reorderCategories(arr);

    containerRef.current?.classList.remove("is-dragging");
    target.classList.remove("is-drag-item");
  }

  const handleDragStart = (e: CategoryDragEvent, index: number) => {
    const target = e.target as HTMLElement;

    dragRef.current = index
    setDragIndex(index);
    containerRef.current?.classList.add("is-dragging");
    target.classList.add("is-drag-item");
  }

  const handleDragEnter = (e: CategoryDragEvent, index: number) => {
    const target = e.target as HTMLElement;

    target.classList.add('is-drag-target');
    dragTargetRef.current = index
  }

  const handleDragLeave = (e: CategoryDragEvent) => {
    const target = e.target as HTMLElement;
    target.classList.remove('is-drag-target');
    dragTargetRef.current = dragIndex;
  }

  const handleDragOver = (e: CategoryDragEvent) => {
    e.preventDefault();
  }

  const handleDrop = (e: CategoryDragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;

    target.classList.remove('is-drag-target');
  }

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
                ref={el => (categoriesRef.current[index] = el)}
                category={category}
                isEditing={index === editingCategoryIndex}
                onIsEditing={() => handleEdit(index)}
                onComplete={() => setEditingCategoryIndex(-1)}
                onDelete={handleDelete}
                draggable={!isEditing}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragLeave={(e) => handleDragLeave(e)}
                onDragOver={handleDragOver}
                onDragEnd={handleSort}
                onDrop={handleDrop}
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