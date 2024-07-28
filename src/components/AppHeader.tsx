import { SyntheticEvent, useContext, useEffect, useState } from "react";
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

export default function AppHeader() {
  const { deckName, isSettingsActive, repeatCard, setDeckName, setIsSettingsActive, setRepeatCard } = useContext(SettingsContext);
  const { cards } = useContext(CardsContext);
  const [hasNotification, setHasNotification] = useState(true);
  const cardCount = cards.length;
  const deckNameDisplayText = deckName || "¯\\_(ツ)_/¯";

  const handleDeckNameChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setDeckName(e.currentTarget.value);
  }

  const handleSettingsToggleClick = () => {
    setIsSettingsActive(true)
    if (hasNotification) setHasNotification(false);
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
            <label htmlFor="card-active-toggle">Allow same card in back-to-back shuffies</label>
          </div>
        </section>

        <section className="app-header-modal-section cluster">
          <button id="delete-deck" className="danger" type="button">Delete deck</button>
        </section>
      </Modal>
    </header>
  )
}