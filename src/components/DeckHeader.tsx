import { useContext, useState } from "react";
import { pluralize } from "@js/utils";
import { SettingsContext } from "@components/SettingsContext";
import { CardsContext } from "./CardsContext";
import { Link } from "react-router-dom";
import { CategoriesContext } from "./CategoriesContext";
import Callout from "./Callout";
import SettingsToggle from "./SettingsToggle";


export default function DeckHeader() {
  const { deckName, setIsSettingsActive } = useContext(SettingsContext);
  const { categories } = useContext(CategoriesContext);
  const [hasNotification, setHasNotification] = useState(!categories.length);
  const { cards } = useContext(CardsContext);
  const cardCount = cards.length;
  const deckNameDisplayText = deckName || "¯\\_(ツ)_/¯";

  const handleSettingsToggleClick = () => {
    setIsSettingsActive(true)
    if (hasNotification) setHasNotification(false);
  }

  return (
    <header className="deck-header">
      <div className="deck-header-info flow flow-xs">
        <h1 className="text-2xl font-semibold">{deckNameDisplayText}</h1>
        <p className="deck-header-card-count">{cardCount} {pluralize("card", "cards", cardCount)}</p>
      </div>

      <div className="deck-header-action">
        {hasNotification && cards.length === 0 ? (
          <Callout>
            <p>Lots of cards to add? Consider setting up deck categories first.</p>
          </Callout>
        ) : (
          <Link className="button action raised large" to='/shuffle'>Shuffy this deck</Link>
        )}
      </div>
      <SettingsToggle hasNotification={hasNotification} onClick={handleSettingsToggleClick} />
    </header>
  )
}