import { useContext, useEffect, useState } from "react";
import AppHeader from "./components/AppHeader";
import CardStarter from "./components/CardStarter";
import CardEditor from "@components/CardEditor";
import { CardsContext } from "@components/CardsContext";
import Card from "@components/Card";
import "@css/deck.css"

export default function Deck() {
  const { cards } = useContext(CardsContext);
  const [name, setName] = useState("Creative Time");
  const [isAddingCard, setIsAddingCard] = useState(false);
  const hasCards = cards.length > 0;

  useEffect(() => {
    if (!name) setName("¯\\_(ツ)_/¯")
  }, [name])

  return (
    <>
      <AppHeader deckName={name} onNameUpdate={setName} />
      <main className="deck">
        {hasCards ? <ul className="cards scroll-x" role="list">
          {cards.map((card) => (
            <li key={card.id}>
              <Card card={card} />
            </li>
          ))}
        </ul> : null}

        {!isAddingCard ? (
          <CardStarter className="center" onClick={() => setIsAddingCard(true)} />
        ) : (
          <CardEditor onComplete={() => setIsAddingCard(false)} />
        )}
      </main>
    </>
  )
}