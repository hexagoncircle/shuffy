import Card, { CardDataProps } from "@components/Card";
import "@css/Deck.css";

interface DeckProps {
  cards: CardDataProps[];
  onDelete(id: string): void;
  onUpdate(card: CardDataProps): void;
}

export default function Deck({ cards, onDelete, onUpdate }: DeckProps) {
  return (
    <section className="flow">
      <h2>Cards</h2>
      <ul className="deck" role="list">
        {cards.map((card) => (
          <li key={card.id}>
            <Card card={card} onUpdate={onUpdate} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    </section>
  );
}
