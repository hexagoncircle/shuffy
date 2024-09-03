import { CSSProperties, SyntheticEvent, useContext } from "react";
import { SettingsContext } from "@components/SettingsContext";
import { CardsContext } from "./CardsContext";
import Categories from "./Categories";
import Modal from "./Modal";
import Switch from "./Switch";
import { CategoriesContext } from "./CategoriesContext";
import { ConfirmModalContext } from "./ConfirmModalContext";
import "@css/settings.css";

export default function SettingsModal() {
  const {
    deckName,
    isSettingsActive,
    repeatCard,
    hasShuffleAnimation,
    setDeckName,
    setIsSettingsActive,
    setRepeatCard,
    setHasShuffleAnimation
  } = useContext(SettingsContext);
  const { cards, deleteAllCards } = useContext(CardsContext);
  const { categories, deleteAllCategories } = useContext(CategoriesContext);
  const { setModalContext } = useContext(ConfirmModalContext);

  const handleDeckNameChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setDeckName(e.currentTarget.value);
  }

  const handleDeleteCardsClick = () => {
    setModalContext({
      isOpen: true,
      title: "Are you sure?",
      message: `This action removes all the cards from the deck. Once they are deleted, they are gone forever.`,
      actionConfirmText: "Yes, reset the deck",
      actionCancelText: "Cancel",
      onConfirm: () => {
        deleteAllCards()
      }
    })
  }

  const handleDeleteCategoriesClick = () => {
    setModalContext({
      isOpen: true,
      title: "Are you sure?",
      message: `This action removes all categories from the deck. Your cards are safe! However, they will no longer be assigned a category. You can still update your cards once new categories are created.`,
      actionConfirmText: "Yes, delete all categories",
      actionCancelText: "Cancel",
      onConfirm: () => {
        deleteAllCategories()
      }
    })
  }

  return (
    <Modal title="Deck Settings" variant="drawer" open={isSettingsActive} onClose={() => setIsSettingsActive(false)}>
      <section className="settings-section flow">
        <Categories />
      </section>

      <section className="settings-section flow">
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
        <div className="checkbox-wrapper">
          <Switch id="card-active-toggle" variant="compact" checked={repeatCard} onChange={() => setRepeatCard(!repeatCard)} />
          <label htmlFor="card-active-toggle">
            Allow same selected card in back-to-back shuffies
          </label>
        </div>
        <div className="checkbox-wrapper">
          <Switch id="shuffle-animation" variant="compact" checked={hasShuffleAnimation} onChange={() => setHasShuffleAnimation(!hasShuffleAnimation)} />
          <label htmlFor="shuffle-animation">
            Play animation when shuffy-ing
          </label>
        </div>
      </section>

      <section
        className="settings-section cluster"
        style={{ "--justify": "flex-end" } as CSSProperties}
      >
        {categories.length ? (
          <button
            id="delete-categories"
            className="danger"
            type="button"
            onClick={handleDeleteCategoriesClick}
          >
            Delete all categories
          </button>
        ) : null}
        {cards.length ? (
          <button
            id="delete-cards"
            className="danger"
            type="button"
            onClick={handleDeleteCardsClick}
          >
            Reset the deck
          </button>
        ) : null}
      </section>
    </Modal>
  )
}