import { CSSProperties, useContext, useState } from "react";
import { getRandomValue } from "@js/utils";
import { CardsContext } from "@components/CardsContext";
import { Link } from "react-router-dom";
import { SettingsContext } from "@components/SettingsContext";
import "@css/shuffle.css";
import Card from "@components/Card";

export default function Shuffle() {
  const { repeatCard } = useContext(SettingsContext);
  const { cards } = useContext(CardsContext);
  const activeCards = cards.filter(card => card.isActive);
  const [card, setCard] = useState(getRandomValue(activeCards));
  const [isReady, setIsReady] = useState(false);

  const getCard = () => {
    const selectedCard = getRandomValue(activeCards);

    if (!repeatCard && card === selectedCard) {
      getCard();
    } else {
      setIsReady(false);
      setCard(selectedCard);
    }
  }

  return (
    <div className="flow" style={{ padding: "var(--space-2xl)" }}>
      <div className="shuffle-wrapper flow stack center">
        {isReady ? (
          <Card card={card} className="is-flipping" />
        ) : (
          <video className="shuffle-video"
            width={1518}
            height={1080}
            muted
            autoPlay
            playsInline
            onEnded={() => setIsReady(true)}
          >
            <source src="shuffle.webm" type="video/webm" />
          </video>
        )}
      </div>
      <div className="cluster center" style={{ "--align": "center", "--justify": "center" } as CSSProperties}>
        <button className="primary reset-button" onClick={isReady ? getCard : () => { console.log("wait!") }}>
          Shuffy it again
        </button>
        <Link to='/deck'>Back to deck</Link>
      </div>
    </div>
  )
}