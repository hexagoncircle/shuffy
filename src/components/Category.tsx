import { CSSProperties, FormEvent, KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import slugify from "slugify";
import { CategoriesContext, CategoryDataProps } from "@components/CategoriesContext";
import ColorPicker from "./ColorPicker";
import GripIcon from "@assets/grip.svg?react";
import "@css/category.css";

export interface CategoryProps {
  category: CategoryDataProps;
}

export default function Category({ category }: CategoryProps) {
  const { updateCategory, deleteCategory } = useContext(CategoriesContext);
  const { id, label, theme } = category;
  const [color, setColor] = useState(theme);
  const [inputValue, setInputValue] = useState(label);
  const [openEditor, setOpenEditor] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const editRef = useRef<HTMLButtonElement>(null);

  const handleContainerKeydown = (e: KeyboardEvent<HTMLElement>) => {
    if (openEditor && e.key === "Escape") {
      e.preventDefault();
      setColor(theme);
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
      theme: color
    })
  }

  const handleDeleteClick = () => {
    setOpenEditor(false);
    deleteCategory(category.id)
  }

  const handleCancelClick = () => {
    setColor(theme);
    setInputValue(label);
    setOpenEditor(false);
  }

  useEffect(() => {
    if (inputRef.current && openEditor) {
      inputRef.current?.focus();
    }
    if (editRef.current && !openEditor) {
      editRef.current?.focus();
    }
  }, [openEditor]);

  return (
    <div className="category box" style={{ "--theme": color } as CSSProperties} onKeyDown={handleContainerKeydown}>
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
          <ColorPicker onChange={(color) => setColor(color)} defaultColor={theme} />
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