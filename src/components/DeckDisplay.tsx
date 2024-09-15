import { useContext, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CardsContext } from "@contexts/CardsContext";
import DeckDisplayControl, { DeckDisplayControlView } from "@components/DeckDisplayControl";
import { getItemById } from "@js/utils";
import CardStarter from "@components/CardStarter";
import CardsSpread from "@components/CardsSpread";
import CardsList from "@components/CardsList";
import PlusIcon from "@assets/plus.svg?react";
import CardEditor, { CardEditAction } from "./CardEditor";

interface DeckDisplayProps {
  isEditing: boolean;
  onIsEditing(isEditing: boolean, action?: CardEditAction): void;
}

export default function DeckDisplay({ isEditing, onIsEditing }: DeckDisplayProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { cards, editCardId, setEditCardId } = useContext(CardsContext);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [view, setView] = useState(searchParams.get('view') as DeckDisplayControlView);
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
    onIsEditing(true);
  }

  const handleOnComplete = (action: CardEditAction) => {
    onIsEditing(false);
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

  if (isEditing) {
    return <CardEditor card={card} onComplete={handleOnComplete}></CardEditor>
  }

  if (isEmptyDeck) {
    return <CardStarter className="center" onClick={() => onIsEditing(true)} />
  }

  return (
    <>
      <section className="deck-controls cluster center">
        <DeckDisplayControl defaultView={view} onClick={handleViewChange} />
        <button
          ref={addCardRef}
          id="add-new-card"
          className="primary small"
          onClick={() => onIsEditing(true, "create")}
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