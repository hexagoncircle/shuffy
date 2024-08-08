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
import SettingsModal from "./SettingsModal";

export default function AppHeader() {
  const {
    deckName,
    setIsSettingsActive,
  } = useContext(SettingsContext);
  const { cards } = useContext(CardsContext);
  const { categories } = useContext(CategoriesContext);
  const [hasNotification, setHasNotification] = useState(!categories.length);
  const cardCount = cards.length;
  const deckNameDisplayText = deckName || "¯\\_(ツ)_/¯";

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
      <SettingsModal />
    </header>
  )
}