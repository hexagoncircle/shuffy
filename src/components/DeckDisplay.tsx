import { useContext, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CardsContext } from "@components/CardsContext";
import DeckDisplayControl, { DeckDisplayControlView } from "@components/DeckDisplayControl";
import CardStarter from "@components/CardStarter";
import CardsSpread from "@components/CardsSpread";
import CardsList from "@components/CardsList";
import PlusIcon from "@assets/plus.svg?react";
import { getItemById } from "@js/utils";
import CardEditor, { CardOnCompleteAction } from "./CardEditor";

export default function DeckDisplay() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { cards, editCardId, setEditCardId } = useContext(CardsContext);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [view, setView] = useState(searchParams.get('view') as DeckDisplayControlView);
  const [isManaging, setIsManaging] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>();
  const [activeGroupIndex, setActiveGroupIndex] = useState<number | null>();
  const addCardRef = useRef<HTMLButtonElement | null>(null);
  const card = getItemById(cards, editCardId);
  const isEmptyDeck = cards.length === 0;

  const resetActiveIndex = () => {
    setActiveGroupIndex(null);
    setActiveCardIndex(null);
  }

  const handleCardClick = (scrollPosition: number, cardIndex: number, groupIndex?: number) => {
    groupIndex !== null && setActiveGroupIndex(groupIndex);
    setActiveCardIndex(cardIndex);
    setScrollPosition(scrollPosition);
    setIsManaging(true);
  }

  const handleOnComplete = (action: CardOnCompleteAction) => {
    setIsManaging(false);
    setEditCardId("");

    if (action === "create") {
      setScrollPosition(-1);
      setActiveCardIndex(cards.length);
      setTimeout(() => addCardRef.current?.focus());
    }
  }

  const handleViewChange = (view: DeckDisplayControlView) => {
    resetActiveIndex();
    setScrollPosition(0);
    setView(view);
    setSearchParams({ view });
  }

  if (isManaging) {
    return <CardEditor card={card} onComplete={handleOnComplete}></CardEditor>
  }

  if (isEmptyDeck) {
    return <CardStarter className="center" onClick={() => setIsManaging(true)} />
  }

  return (
    <>
      <section className="deck-controls cluster center">
        <DeckDisplayControl defaultView={view} onClick={handleViewChange} />
        <button
          ref={addCardRef}
          id="add-new-card"
          className="primary small"
          onClick={() => setIsManaging(true)}
        >
          <PlusIcon /> Add a card
        </button>
      </section>

      {!view || view === "spread" ? (
        <CardsSpread
          focusIndex={activeCardIndex}
          scrollPosition={scrollPosition}
          onCardClick={handleCardClick}
        />
      ) : (
        <CardsList
          focusCardIndex={activeCardIndex}
          focusGroupIndex={activeGroupIndex}
          scrollPosition={scrollPosition}
          onCardClick={handleCardClick}
        />
      )}
    </>
  );
}