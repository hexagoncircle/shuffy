import { CSSProperties, KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import { SettingsContext } from "@components/SettingsContext";
import { v4 as uuid } from "uuid";
import { CategoriesContext } from "@components/CategoriesContext";
import { CardsContext } from "@components/CardsContext";
import Select from "./Select";
import CategorySelectIcon from "@assets/category-select.svg?react";
import clsx from "clsx";

interface CardCreatorProps {
  onComplete(value?: "add" | "cancel"): void;
}

export default function CardCreator({ onComplete }: CardCreatorProps) {
  const nameRef = useRef<HTMLTextAreaElement>(null);
  const { lastSelectedCategory, setIsSettingsActive, setLastSelectedCategory } = useContext(SettingsContext);
  const { categories } = useContext(CategoriesContext);
  const { createCard } = useContext(CardsContext);
  const [nameValue, setNameValue] = useState("");
  const nameMaxLength = 80;

  const [selectedCategory, setSelectedCategory] = useState(lastSelectedCategory);
  const selectedCategoryObj = categories.find(c => c.id === selectedCategory);
  const categoryOptions = [
    { label: "Select a category", value: "" },
    ...categories.map(({ label, id }) => ({ label, value: id }))
  ];

  const handleNameInputKeydown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (e.currentTarget.value) {
        handleCreateCard();
      }
    }
  }

  const handleKeyboardCancel = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onComplete("cancel");
    }
  }

  const handleCreateCard = () => {
    createCard({
      id: `card-${uuid()}`,
      isActive: true,
      label: nameValue,
      category: selectedCategory
    });
    setLastSelectedCategory(selectedCategory);
    onComplete();
  }

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current?.focus();
    }
  }, []);

  return (
    <article className="card-editor flow center" onKeyDown={handleKeyboardCancel}>
      <header className="card-editor-category-select">
        <label htmlFor="select-category" className="visually-hidden">Category</label>
        <Select
          id="select-category"
          options={categoryOptions}
          selected={selectedCategory}
          onChange={(e) => setSelectedCategory(e.currentTarget.value)}
        />
        <button className="icon-button" onClick={() => setIsSettingsActive(true)}>
          <CategorySelectIcon aria-hidden="true" />
        </button>
      </header>
      <section className="card" style={{ "--theme": selectedCategoryObj?.theme } as CSSProperties}>
        <div className="card-front">
          <div className="card-display">
            {selectedCategoryObj && <div className="card-category">{selectedCategoryObj.label}</div>}

            <div className="editor-box">
              <div className="editor-box-corner"></div>
              <div className="editor-box-corner"></div>
              <div className="editor-box-corner"></div>
              <div className="editor-box-corner"></div>
              <label htmlFor="edit-card-title" className="visually-hidden">Card label</label>
              <div className="card-name-wrapper stack" data-value={nameValue}>
                <textarea
                  ref={nameRef}
                  id="edit-card-title"
                  className="card-name"
                  placeholder="Enter text for this card"
                  maxLength={nameMaxLength}
                  rows={nameValue ? 1 : 2}
                  value={nameValue}
                  onChange={(e) => setNameValue(e.currentTarget.value)}
                  onKeyDown={handleNameInputKeydown}
                />
              </div>
              <p className={clsx("character-count", nameValue.length >= nameMaxLength && "limit")}>
                {nameValue.length} / {nameMaxLength}
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="actions">
        <button className="raised action" disabled={!nameValue} onClick={handleCreateCard}>Add card to deck</button>
        <button onClick={() => onComplete("cancel")}>Cancel</button>
      </footer>
    </article>
  );
}
