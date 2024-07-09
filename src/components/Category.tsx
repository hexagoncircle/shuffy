import { CSSProperties, FormEvent, KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import slugify from "slugify";
import { CategoriesContext, CategoryDataProps } from "@components/CategoriesContext";
import ColorPicker from "./ColorPicker";
import GripIcon from "@assets/grip.svg?react";
import { useClickAway } from "@uidotdev/usehooks";
import "@css/category.css";

export interface CategoryProps {
  category: CategoryDataProps;
}

export default function Category({ category }: CategoryProps) {
  const { updateCategory, deleteCategory } = useContext(CategoriesContext);
  const { id, label, theme } = category;
  const [colorValue, setColorValue] = useState(theme);
  const [inputValue, setInputValue] = useState(label);
  const [openEditor, setOpenEditor] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const editRef = useRef<HTMLButtonElement>(null);
  const ref = useClickAway<HTMLDivElement>(() => {
    openEditor && handleCancelClick()
  })

  const handleContainerKeydown = (e: KeyboardEvent<HTMLElement>) => {
    if (openEditor && e.key === "Escape") {
      e.preventDefault();
      setColorValue(theme);
      setInputValue(label);
      setOpenEditor(false);
    }
  }

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (openEditor && e.key === "Enter") {
      e.preventDefault();

      if (e.currentTarget.value) {
        handleSaveClick();
      }
    }
  }

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  const handleSaveClick = () => {
    setOpenEditor(false);
    updateCategory({
      ...category,
      label: inputValue,
      value: slugify(inputValue, { lower: true }),
      theme: colorValue
    })
  }

  const handleDeleteClick = () => {
    setOpenEditor(false);
    deleteCategory(category.id)
  }

  const handleCancelClick = () => {
    setColorValue(theme);
    setInputValue(label);
    setOpenEditor(false);
  }

  useEffect(() => {
    if (openEditor) {
      inputRef.current?.focus();
    }
    if (!openEditor) {
      editRef.current?.focus();
    }
  }, [openEditor]);

  return (
    <div ref={ref} className="category box" style={{ "--theme": colorValue } as CSSProperties} onKeyDown={handleContainerKeydown}>
      <section className="category-content">
        <GripIcon className="grip" />
        {!openEditor ? (
          <button
            ref={editRef}
            type="button"
            className="category-edit-button"
            onClick={() => setOpenEditor(true)}
          >
            {label}
          </button>
        ) : (
          <>
            <label htmlFor={`category-edit-${id}`} className="visually-hidden">Category</label>
            <input
              ref={inputRef}
              id={`category-edit-${id}`}
              className="compact"
              type="text"
              required
              autoComplete="off"
              placeholder="Enter a category title..."
              defaultValue={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeydown}
            />
          </>
        )}
        <div className="dot"></div>
      </section>
      {openEditor ? (
        <section className="category-editor">
          <ColorPicker onChange={(color) => setColorValue(color)} defaultColor={theme} />
          <footer className="category-editor-actions cluster">
            <button type="button" className="danger small" onClick={handleDeleteClick}>Delete</button>
            <button type="button" className="cancel-button text small" onClick={handleCancelClick}>Cancel</button>
            <button type="button" className="primary small" onClick={handleSaveClick} disabled={!inputValue}>Save changes</button>
          </footer>
        </section>
      ) : null}
    </div>
  )
}