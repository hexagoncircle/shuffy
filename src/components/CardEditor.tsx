import { CSSProperties, KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import clsx from "clsx";
import { getItemById } from "@js/utils";
import { SettingsContext } from "@components/SettingsContext";
import { CategoriesContext } from "@components/CategoriesContext";
import { CardDataProps, CardsContext } from "@components/CardsContext";
import Select from "./Select";
import CategorySelectIcon from "@assets/category-select.svg?react";

export type CardEditAction = "create" | "update" | "cancel";

interface CardEditorProps {
  card?: CardDataProps;
  onComplete(value: CardEditAction): void;
}

export default function CardEditor({ card, onComplete }: CardEditorProps) {
  const { lastSelectedCategory, setIsSettingsActive, setLastSelectedCategory } = useContext(SettingsContext);
  const { categories } = useContext(CategoriesContext);
  const { createCard, updateCard, deleteCard } = useContext(CardsContext);

  const [nameValue, setNameValue] = useState(card?.label || "");
  const nameRef = useRef<HTMLTextAreaElement>(null);
  const nameMaxLength = 80;
  const isNameCharacterLimit = nameValue.length >= nameMaxLength;

  const [selectedCategory, setSelectedCategory] = useState(card?.category || lastSelectedCategory);
  const selectedCategoryObj = selectedCategory ? getItemById(categories, selectedCategory) : null;
  const categoryOptions = [
    { label: "Select a category", value: "" },
    ...categories.map(({ label, id }) => ({ label, value: id }))
  ];

  const handleEscapeCancel = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onComplete("cancel");
    }
  }

  const handleNameInputKeydown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (e.currentTarget.value) {
        card ? handleUpdate() : handleCreate();
      }
    }
  }

  const handleCreate = () => {
    createCard({
      id: `card-${uuid()}`,
      isActive: true,
      label: nameValue,
      category: selectedCategory
    });
    setLastSelectedCategory(selectedCategory);
    onComplete("create");
  }

  const handleUpdate = () => {
    if (!card) return;

    updateCard({
      ...card,
      label: nameValue,
      category: selectedCategory
    });
    onComplete("update");
  }

  const handleDelete = () => {
    if (!card) return;

    deleteCard(card.id);
    onComplete("update");
  }

  useEffect(() => {
    const ref = nameRef.current;

    // Focus name input and set cursor at the end of the value.
    if (ref) {
      const length = ref.value.length;

      ref?.focus();
      ref.setSelectionRange(length, length);
    }

  }, []);

  return (
    <>
      <article className="card-editor flow center" onKeyDown={handleEscapeCancel}>
        <div className="card-editor-category-select">
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
        </div>
        <div
          className="card"
          style={{ "--theme": selectedCategoryObj?.theme } as CSSProperties}
        >
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
                <p className={clsx("character-count", isNameCharacterLimit && "limit")}>
                  {nameValue.length} / {nameMaxLength}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
      <footer className="actions">
        {card ? (
          <>
            <button
              className="primary"
              disabled={!nameValue}
              onClick={handleUpdate}
            >
              Update card
            </button>
            <button className="danger" onClick={handleDelete}>
              Delete card
            </button>
          </>
        ) : (
          <>
            <button
              className="raised action"
              disabled={!nameValue}
              onClick={handleCreate}
            >
              Add card to deck
            </button>
            <button onClick={() => onComplete("cancel")}>
              Cancel
            </button>
          </>
        )}
      </footer>
    </>
  );
}
