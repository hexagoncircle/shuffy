import Card, { CardDataProps } from "./Card";
import "@css/Deck.css";

interface DeckProps {
  cards: CardDataProps[];
  deleteCard(id: string): void;
  updateCard(card: CardDataProps): void;
}

export default function Deck({ cards, deleteCard, updateCard }: DeckProps) {
  const toggleCardActiveState = (id: string) => {
    const card = cards.find((card) => id === card.id);

    // if (id === card.id) {
    //   return { ...card, isActive: !card.isActive };
    // }
    // return card;

    updateCard(card);
  };

  return (
    <section className="flow">
      <h2>Cards</h2>
      <ul className="deck" role="list">
        {cards.map((card) => (
          <li key={card.id}>
            <Card
              card={card}
              setIsActive={toggleCardActiveState}
              onUpdate={updateCard}
              onDelete={deleteCard}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
