import { CSSProperties, useContext, useState } from "react";
import { usePrevious } from "@uidotdev/usehooks";
import { getRandomValue } from "@js/utils";
import { CardsContext } from "@components/CardsContext";
import { Link } from "react-router-dom";
import { SettingsContext } from "@components/SettingsContext";

export default function Shuffle() {
  const { repeatCard } = useContext(SettingsContext);
  const { cards } = useContext(CardsContext);
  const activeCards = cards.filter(card => card.isActive);
  const [card, setCard] = useState(getRandomValue(activeCards));

  const getCard = () => {
    const selectedCard = getRandomValue(activeCards);

    if (!repeatCard && card === selectedCard) {
      getCard();
    } else {
      setCard(selectedCard);
    }
  }

  return (
    <div className="flow" style={{ padding: "var(--space-2xl)" }}>
      {card && <p>{card.label}</p>}
      <div className="cluster" style={{ "--align": "center" } as CSSProperties}>
        <button className="action raised large" onClick={getCard}>
          Shuffy it again
        </button>
        <Link className="button primary" to='/deck'>Back to deck</Link>
      </div>
    </div>
  )
}