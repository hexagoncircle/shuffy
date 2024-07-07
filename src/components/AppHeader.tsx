import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { pluralize } from "@js/utils";
import { v4 as uuid } from "uuid";
import Callout from "./Callout";
import SettingsToggle from "./SettingsToggle";
import Modal from "./Modal";
import Category from "./Category";
import PlusIcon from "@assets/plus.svg?react";
import "@css/app-header.css";
import { CategoriesContext } from "./CategoriesContext";
import CategoryCreator from "./CategoryCreator";

interface AppHeaderProps {
  deckName: string;
  onNameUpdate(value: string): void;
}

export default function AppHeader({ deckName, onNameUpdate }: AppHeaderProps) {
  const { categories } = useContext(CategoriesContext);
  const addCategoryButtonRef = useRef<HTMLButtonElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const count = categories.length;

  const handleDeckNameChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    onNameUpdate(target.value);
  }

  useEffect(() => {
    // Refocus "Add category" button if CategoryCreator action is canceled
    if (addCategoryButtonRef.current && !isCreatingCategory) {
      addCategoryButtonRef.current?.focus();
    }
  }, [isCreatingCategory]);

  return (
    <header className="app-header">
      <section className="app-header-info">
        <h1 className="text-2xl font-semibold">{deckName}</h1>
        <p className="app-header-card-count">{count} {pluralize("card", "cards", count)}</p>
      </section>
      <Callout>
        <p>Lots of cards to add? Consider setting up deck categories first.</p>
      </Callout>
      <SettingsToggle hasNotification onClick={() => setOpenModal(true)} />

      <Modal title="Deck Settings" variant="drawer" open={openModal} onClose={() => setOpenModal(false)}>
        <section className="app-header-modal-section flow">
          <ul className="flow flow-s" role="list">
            {categories.map((category) => (
              <li key={category.id}>
                <Category category={category} />
              </li>
            ))}
          </ul>

          {isCreatingCategory ? (
            <CategoryCreator onComplete={() => setIsCreatingCategory(false)} />
          ) : (
            <button
              ref={addCategoryButtonRef}
              type="button"
              className="primary small center"
              onClick={() => setIsCreatingCategory(true)}
            >
              <PlusIcon />
              Add a category
            </button>
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