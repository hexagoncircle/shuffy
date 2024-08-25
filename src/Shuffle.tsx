import { useContext, useEffect, useRef, useState } from "react";
import { getRandomValue } from "@js/utils";
import { CardsContext } from "@components/CardsContext";
import { Link } from "react-router-dom";
import { SettingsContext } from "@components/SettingsContext";
import Card from "@components/Card";
import "@css/shuffle.css";

export default function Shuffle() {
  const displayRef = useRef<HTMLButtonElement | null>(null);
  const { shuffleAnimation, repeatCard } = useContext(SettingsContext);
  const { cards } = useContext(CardsContext);
  const activeCards = cards.filter(card => card.isActive);
  const [card, setCard] = useState(getRandomValue(activeCards));
  const [isPlaybackComplete, setIsPlaybackComplete] = useState(false);
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
    if (shuffleAnimation) {
      setShowActions(false);
      setIsPlaybackComplete(false);
    }
    getCard();
  }

  useEffect(() => {
    !shuffleAnimation && setIsPlaybackComplete(true);
  }, [shuffleAnimation]);

  const handlePlaybackEnded = () => {
    setIsPlaybackComplete(true);
  }

  useEffect(() => {
    if (!displayRef.current) return;

    const card = displayRef.current;

    const handleAnimationEnd = () => {
      setShowActions(true);
    }

    card.addEventListener("animationend", handleAnimationEnd);

    return () => {
      card.removeEventListener("animationend", handleAnimationEnd);
    }
  }, [])

  return (
    <>
      <main className="shuffle-display main-display">
        <article ref={displayRef} className="shuffle-wrapper stack center">
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