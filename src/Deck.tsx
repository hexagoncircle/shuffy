import { useContext, useEffect, useRef, useState } from "react";
import AppHeader from "./components/AppHeader";
import DeckDisplayControl from "@components/DeckDisplayControl";
import CardStarter from "./components/CardStarter";
import CardEditor from "@components/CardEditor";
import { CardDataProps, CardsContext } from "@components/CardsContext";
import Card from "@components/Card";
import PlusIcon from "@assets/plus.svg?react";
import "@css/deck.css"
import { useIsFirstRender } from "@uidotdev/usehooks";

export default function Deck() {
  const { cards } = useContext(CardsContext);
  const isFirstRender = useIsFirstRender();
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const [name, setName] = useState("Creative Time");
  const [openEditor, setOpenEditor] = useState(false);
  const [editCard, setEditCard] = useState<CardDataProps | null>(null);
  const hasCards = cards.length > 0;

  const handleEditCard = (card: CardDataProps) => {
    setEditCard(card);
    setOpenEditor(true);
  }

  const handleEditComplete = () => {
    setEditCard(null);
    setOpenEditor(false)
  }

  useEffect(() => {
    if (!name) setName("¯\\_(ツ)_/¯")
  }, [name])

  useEffect(() => {
    if (!isFirstRender && !openEditor) {
      addButtonRef.current?.focus();
    }
  }, [openEditor, isFirstRender]);

  return (
    <>
      <AppHeader deckName={name} onNameUpdate={setName} />
      <main className="deck flow">
        {openEditor ? (
          <CardEditor card={editCard} onComplete={handleEditComplete} />
        ) : hasCards ? (
          <>
            <section className="deck-controls cluster center">
              <DeckDisplayControl />
              <button ref={addButtonRef} className="primary small" onClick={() => setOpenEditor(true)}>
                <PlusIcon /> Add a card
              </button>
            </section>
            <section className="cards-wrapper scroll-x">
              <ul className="cards" role="list">
                {cards.map((card) => (
                  <li key={card.id}>
                    <Card card={card} onClick={handleEditCard} />
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : (
          <CardStarter ref={addButtonRef} className="center" onClick={() => setOpenEditor(true)} />
        )}
      </main>
    </>
  )
}