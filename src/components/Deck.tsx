import Card, { CardDataProps } from "@components/Card";
import "@css/Deck.css";

interface DeckProps {
  cards: CardDataProps[];
  deleteCard(id: string): void;
  updateCard(card: CardDataProps): void;
}

export default function Deck({ cards, deleteCard, updateCard }: DeckProps) {
  return (
    <section className="flow">
      <h2>Cards</h2>
      <ul className="deck" role="list">
        {cards.map((card) => (
          <li key={card.id}>
            <Card card={card} onUpdate={updateCard} onDelete={deleteCard} />
          </li>
        ))}
      </ul>
    </section>
  );
}
