import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { pluralize } from "@js/utils";
import Callout from "./Callout";
import SettingsToggle from "./SettingsToggle";
import Modal from "./Modal";
import Category from "./Category";
import PlusIcon from "@assets/plus.svg?react";
import { CategoriesContext } from "@components/CategoriesContext";
import { SettingsContext } from "@components/SettingsContext";
import CategoryStarter from "./CategoryStarter";
import CategoryCreator from "./CategoryCreator";
import "@css/app-header.css";
import { CardsContext } from "./CardsContext";

interface AppHeaderProps {
  deckName: string;
  onNameUpdate(value: string): void;
}

export default function AppHeader({ deckName, onNameUpdate }: AppHeaderProps) {
  const { isSettingsActive, setIsSettingsActive } = useContext(SettingsContext);
  const { categories } = useContext(CategoriesContext);
  const { cards } = useContext(CardsContext);

  const [hasNotification, setHasNotification] = useState(true);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const addCategoryButtonRef = useRef<HTMLButtonElement>(null);
  const hasCategories = categories.length > 0;
  const cardCount = cards.length;

  const handleDeckNameChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    onNameUpdate(target.value);
  }

  const handleSettingsToggleClick = () => {
    setIsSettingsActive(true)
    if (hasNotification) setHasNotification(false);
  }

  useEffect(() => {
    // Refocus "Add category" button if category create action is canceled
    if (addCategoryButtonRef.current && !isCreatingCategory) {
      addCategoryButtonRef.current?.focus();
    }
  }, [isCreatingCategory]);

  return (
    <header className="app-header">
      <section className="app-header-info">
        <h1 className="text-2xl font-semibold">{deckName}</h1>
        <p className="app-header-card-count">{cardCount} {pluralize("card", "cards", cardCount)}</p>
      </section>

      {hasNotification ? (
        <Callout>
          <p>Lots of cards to add? Consider setting up deck categories first.</p>
        </Callout>
      ) : null}

      <SettingsToggle hasNotification={hasNotification} onClick={handleSettingsToggleClick} />

      <Modal title="Deck Settings" variant="drawer" open={isSettingsActive} onClose={() => setIsSettingsActive(false)}>
        <section className="app-header-modal-section flow">
          {hasCategories ? <ul className="flow flow-s" role="list">
            {categories.map((category) => (
              <li key={category.id}>
                <Category category={category} />
              </li>
            ))}
          </ul> : null}

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
        </section>

        <section className="app-header-modal-section flow">
          <div>
            <label htmlFor="input-with-label">Deck name</label>
            <input
              id="input-with-label"
              type="text"
              defaultValue={deckName}
              autoComplete="off"
              placeholder="Add a name"
              onChange={handleDeckNameChange}
            />
          </div>
        </section>

        <section className="app-header-modal-section cluster">
          <button id="delete-deck" className="danger" type="button">Delete deck</button>
        </section>
      </Modal>
    </header>
  )
}