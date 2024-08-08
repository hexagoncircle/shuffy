import { CSSProperties, SyntheticEvent, useContext, useState } from "react";
import { pluralize } from "@js/utils";
import { SettingsContext } from "@components/SettingsContext";
import { CardsContext } from "./CardsContext";
import SettingsToggle from "./SettingsToggle";
import Categories from "./Categories";
import Callout from "./Callout";
import Modal from "./Modal";
import "@css/app-header.css";
import { Link } from "react-router-dom";
import Switch from "./Switch";
import { CategoriesContext } from "./CategoriesContext";
import { ConfirmModalContext } from "./ConfirmModalContext";

export default function AppHeader() {
  const {
    deckName,
    isSettingsActive,
    repeatCard,
    shuffleAnimation,
    setDeckName,
    setIsSettingsActive,
    setRepeatCard,
    setShuffleAnimation
  } = useContext(SettingsContext);
  const { cards, deleteAllCards } = useContext(CardsContext);
  const { categories, deleteAllCategories } = useContext(CategoriesContext);
  const { setModalContext } = useContext(ConfirmModalContext);
  const [hasNotification, setHasNotification] = useState(!categories.length);
  const cardCount = cards.length;
  const deckNameDisplayText = deckName || "¯\\_(ツ)_/¯";

  const handleDeckNameChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setDeckName(e.currentTarget.value);
  }

  const handleSettingsToggleClick = () => {
    setIsSettingsActive(true)
    if (hasNotification) setHasNotification(false);
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
    <header className="app-header">
      <section className="app-header-info">
        <h1 className="text-2xl font-semibold">{deckNameDisplayText}</h1>
        <p className="app-header-card-count">{cardCount} {pluralize("card", "cards", cardCount)}</p>
      </section>

      {hasNotification && cards.length === 0 ? (
        <Callout>
          <p>Lots of cards to add? Consider setting up deck categories first.</p>
        </Callout>
      ) : (
        <Link className="button action raised large" to='/shuffle'>Shuffy this deck</Link>
      )}

      <SettingsToggle hasNotification={hasNotification} onClick={handleSettingsToggleClick} />

      <Modal title="Deck Settings" variant="drawer" open={isSettingsActive} onClose={() => setIsSettingsActive(false)}>
        <section className="app-header-modal-section flow">
          <Categories />
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
          <div className="checkbox-wrapper">
            <Switch id="card-active-toggle" variant="compact" checked={repeatCard} onChange={() => setRepeatCard(!repeatCard)} />
            <label htmlFor="card-active-toggle">
              Allow same card in back-to-back shuffies
            </label>
          </div>
          <div className="checkbox-wrapper">
            <Switch id="shuffle-animation" variant="compact" checked={shuffleAnimation} onChange={() => setShuffleAnimation(!shuffleAnimation)} />
            <label htmlFor="shuffle-animation">
              Play animation when shuffy-ing
            </label>
          </div>
        </section>

        <section
          className="app-header-modal-section cluster"
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
    </header>
  )
}