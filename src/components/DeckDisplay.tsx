import {
  startTransition,
  addTransitionType,
  useRef,
  useState,
  ViewTransition,
} from "react";
import { getItemById } from "@js/utils";
import { useSearchParams } from "react-router-dom";
import { useCardsContext } from "@hooks/useCardsContext";
import DeckDisplayControl, {
  DeckDisplayControlView,
} from "@components/DeckDisplayControl";
import CardStarter from "@components/CardStarter";
import CardsSpread from "@components/CardsSpread";
import CardsList from "@components/CardsList";
import PlusIcon from "@assets/plus.svg?react";
import CardEditor, { CardEditAction } from "./CardEditor";
import { VIEW_TRANSITIONS } from "@js/constants";

interface DeckDisplayProps {
  isEditing: boolean;
  onIsEditing(isEditing: boolean, action?: CardEditAction): void;
}

export default function DeckDisplay({
  isEditing,
  onIsEditing,
}: DeckDisplayProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { cards, editCardId, setEditCardId } = useCardsContext();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [view, setView] = useState(
    searchParams.get("view") as DeckDisplayControlView
  );
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>();
  const [activeGroupIndex, setActiveGroupIndex] = useState<number | null>();
  const addCardRef = useRef<HTMLButtonElement | null>(null);
  const card = getItemById(cards, editCardId);
  const isEmptyDeck = cards.length === 0;
  const isCardSpreadView = !view || view === "spread";

  const resetActiveIndex = () => {
    setActiveGroupIndex(null);
    setActiveCardIndex(null);
  };

  const handleCardClick = (
    scrollPosition: number,
    cardIndex: number,
    groupIndex?: number
  ) => {
    groupIndex !== null && setActiveGroupIndex(groupIndex);
    setActiveCardIndex(cardIndex);
    setScrollPosition(scrollPosition);
    onIsEditing(true);
  };

  const handleOnComplete = (action: CardEditAction) => {
    onIsEditing(false);
    setEditCardId("");

    if (action === "create") {
      setScrollPosition(-1);
      setActiveCardIndex(cards.length);
      setTimeout(() => addCardRef.current?.focus());
    }
  };

  const handleViewChange = (selectedView: DeckDisplayControlView) => {
    if (view === selectedView) return;

    startTransition(() => {
      addTransitionType(VIEW_TRANSITIONS.none);
      resetActiveIndex();
      setScrollPosition(0);
      setView(selectedView);
      setSearchParams({ view: selectedView });
    });
  };

  if (isEditing) {
    return <CardEditor card={card} onComplete={handleOnComplete}></CardEditor>;
  }

  if (isEmptyDeck) {
    return <CardStarter className="center" onClick={() => onIsEditing(true)} />;
  }

  return (
    <>
      <ViewTransition
        enter={VIEW_TRANSITIONS.screen}
        exit={VIEW_TRANSITIONS.screen}
      >
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
      </ViewTransition>
      <ViewTransition
        enter={VIEW_TRANSITIONS.screen}
        exit={VIEW_TRANSITIONS.screen}
        update={VIEW_TRANSITIONS.none}
      >
        {isCardSpreadView ? (
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
      </ViewTransition>
    </>
  );
}
