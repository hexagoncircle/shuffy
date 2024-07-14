import { SyntheticEvent, useContext, useState } from "react";
import { pluralize } from "@js/utils";
import { SettingsContext } from "@components/SettingsContext";
import { CardsContext } from "./CardsContext";
import SettingsToggle from "./SettingsToggle";
import Categories from "./Categories";
import Callout from "./Callout";
import Modal from "./Modal";
import "@css/app-header.css";

interface AppHeaderProps {
  deckName: string;
  onNameUpdate(value: string): void;
}

export default function AppHeader({ deckName, onNameUpdate }: AppHeaderProps) {
  const { isSettingsActive, setIsSettingsActive } = useContext(SettingsContext);
  const { cards } = useContext(CardsContext);
  const [hasNotification, setHasNotification] = useState(true);
  const cardCount = cards.length;

  const handleDeckNameChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    onNameUpdate(target.value);
  }

  const handleSettingsToggleClick = () => {
    setIsSettingsActive(true)
    if (hasNotification) setHasNotification(false);
  }

  return (
    <header className="app-header">
      <section className="app-header-info">
        <h1 className="text-2xl font-semibold">{deckName}</h1>
        <p className="app-header-card-count">{cardCount} {pluralize("card", "cards", cardCount)}</p>
      </section>

      {hasNotification && cards.length === 0 ? (
        <Callout>
          <p>Lots of cards to add? Consider setting up deck categories first.</p>
        </Callout>
      ) : <button className="action raised large">Shuffy this deck</button>}

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
        </section>

        <section className="app-header-modal-section cluster">
          <button id="delete-deck" className="danger" type="button">Delete deck</button>
        </section>
      </Modal>
    </header>
  )
}