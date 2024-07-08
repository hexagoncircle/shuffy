import { CSSProperties, ChangeEvent, KeyboardEvent, useContext, useState } from "react";
import { SettingsContext } from "@components/SettingsContext";
import { v4 as uuid } from "uuid";
import { CategoriesContext } from "@components/CategoriesContext";
import { CardsContext } from "@components/CardsContext";
import Select from "./Select";
import CategorySelectIcon from "@assets/category-select.svg?react";

interface CardEditorProps {
  category?: string;
  label?: string;
  onComplete(): void;
}

export default function CardEditor({ category, label, onComplete }: CardEditorProps) {
  const { setIsSettingsActive } = useContext(SettingsContext);
  const { categories } = useContext(CategoriesContext);
  const { createCard } = useContext(CardsContext);
  const [nameValue, setNameValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const categoryObj = categories.find(c => c.id === selectedCategory);
  const categoryOptions = [
    { label: "Select a category", value: "" },
    ...categories.map(({ label, id }) => ({ label, value: id }))
  ];

  const handleEscapeCancel = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onComplete();
    }
  }

  const handleNameInputKeydown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (e.currentTarget.value) {
        handleCreateCard();
      }
    }
  }

  const handleCreateCard = () => {
    createCard({
      id: uuid(),
      isActive: true,
      label: nameValue,
      category: selectedCategory
    })
    onComplete();
  }

  return (
    <article className="card-editor flow center" onKeyDown={handleEscapeCancel}>
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
      <section className="card" style={{ "--theme": categoryObj?.theme } as CSSProperties}>
        {categoryObj && <div className="card-category">{categoryObj.label}</div>}
        <div className="editor-box">
          <div className="editor-box-corner"></div>
          <div className="editor-box-corner"></div>
          <div className="editor-box-corner"></div>
          <div className="editor-box-corner"></div>
          <label htmlFor="edit-card-title"></label>
          <div className="card-name-wrapper stack" data-value={nameValue}>
            <textarea
              id="edit-card-title"
              className="card-name"
              placeholder="Enter text for this card"
              rows={nameValue ? 1 : 2}
              value={nameValue}
              onChange={(e) => setNameValue(e.currentTarget.value)}
              onKeyDown={handleNameInputKeydown}
            />
          </div>
        </div>
      </section>
      <footer className="actions">
        <button className="raised action" disabled={!nameValue} onClick={handleCreateCard}>Add card to deck</button>
        <button onClick={onComplete}>Cancel</button>
      </footer>
    </article>
  );
}
