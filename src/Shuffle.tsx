import { useState } from "react";
import { getRandomValue } from "@js/utils";
import { Link } from "react-router-dom";
import Card from "@components/Card";
import "@css/shuffle.css";
import { useCardsContext } from "@hooks/useCardsContext";
import { useSettingsContext } from "@hooks/useSettingsContext";

export default function Shuffle() {
  const { hasShuffleAnimation, repeatCard } = useSettingsContext();
  const { cards } = useCardsContext();
  const activeCards = cards.filter(card => card.isActive);
  const [card, setCard] = useState(getRandomValue(activeCards));
  const [isPlaybackComplete, setIsPlaybackComplete] = useState(!hasShuffleAnimation);
  const [showActions, setShowActions] = useState(false);

  const getCard = () => {
    const selectedCard = getRandomValue(activeCards);

    if (!repeatCard && card === selectedCard) {
      getCard();
    } else {
      setCard(selectedCard);
    }
  }

  const handleReshuffle = () => {
    if (hasShuffleAnimation) {
      setShowActions(false);
      setIsPlaybackComplete(false);
    }
    getCard();
  }

  const handlePlaybackEnded = () => {
    setIsPlaybackComplete(true);
  }

  const handleAnimationEnd = () => {
    setShowActions(true);
  }

  return (
    <>
      <main className="shuffle-display main-display">
        <article onAnimationEnd={handleAnimationEnd} className="shuffle-wrapper stack center">
          {isPlaybackComplete ? (
            <Card card={card} className="is-flipping" />
          ) : (
            <video className="shuffle-video"
              width={1518}
              height={1080}
              autoPlay
              muted
              playsInline
              onEnded={handlePlaybackEnded}
            >
              <source src="shuffle.mov" type='video/mp4; codecs="hvc1"' />
              <source src="shuffle.webm" type="video/webm" />
            </video>
          )}
        </article>
        <div className="shuffle-actions-wrapper" hidden={!showActions}>
          <footer className="actions">
            <button className="raised action" onClick={handleReshuffle}>
              Shuffy it again
            </button>
            <Link className="button primary" to='/deck'>Back to deck</Link>
          </footer>
        </div>
      </main>
    </>
  )
}