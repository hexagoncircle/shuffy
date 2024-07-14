import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CardsContext } from "@components/CardsContext";
import DeckDisplayControl, { DeckDisplayControlView } from "@components/DeckDisplayControl";
import CardStarter from "@components/CardStarter";
import CardsSpread from "@components/CardsSpread";
import CardsList from "@components/CardsList";
import PlusIcon from "@assets/plus.svg?react";
import CardManager from "@components/CardManager";
import { getItemById } from "@js/utils";

export default function DeckDisplay() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { cards, editCardId, setEditCardId } = useContext(CardsContext);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [view, setView] = useState(searchParams.get('view') as DeckDisplayControlView || "stack");
  const [isManaging, setIsManaging] = useState(false);
  const card = getItemById(cards, editCardId);
  const isEmptyDeck = cards.length === 0;

  const handleStackCardClick = (cardScrollPosition: number) => {
    setIsManaging(true);
    setScrollPosition(cardScrollPosition)
  }

  const handleListCardClick = (id: string) => {
    setIsManaging(true);
    setEditCardId(id)
  }

  const handleEditComplete = () => {
    setEditCardId("");
    setIsManaging(false);
  }

  const handleAddComplete = () => {
    setScrollPosition(-1)
    setIsManaging(false);
  }

  const handleViewChange = (view: DeckDisplayControlView) => {
    setView(view);
    setSearchParams({ view })
  }

  if (isManaging) {
    return (
      <CardManager
        card={card}
        onEditComplete={handleEditComplete}
        onAddComplete={handleAddComplete}
      />
    );
  }

  if (isEmptyDeck) {
    return (
      <CardStarter className="center" onClick={() => setIsManaging(true)} />
    )
  }

  return (
    <>
      <section className="deck-controls cluster center">
        <DeckDisplayControl defaultView={view} onClick={handleViewChange} />
        <button className="primary small" onClick={() => setIsManaging(true)}>
          <PlusIcon /> Add a card
        </button>
      </section>

      {view === "stack" ? (
        <CardsSpread
          scrollPosition={scrollPosition}
          onClick={handleStackCardClick}
        />
      ) : (
        <CardsList onCardClick={handleListCardClick} />
      )}
    </>
  );
}