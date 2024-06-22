import Card, { CardDataProps } from "./Card";
import "@css/Deck.css";

interface DeckProps {
  cards: CardDataProps[];
  deleteCard(id: string): void;
  updateCards(value: CardDataProps[]): void;
}

export default function Deck({ cards, deleteCard, updateCards }: DeckProps) {
  const toggleCardActiveState = (id: string) => {
    const updatedCards = cards.map((card) => {
      if (id === card.id) {
        return { ...card, isActive: !card.isActive };
      }
      return card;
    });

    updateCards(updatedCards);
  };

  const updateCard = (updatedCard: CardDataProps) => {
    const updatedCards = cards.map((card) => {
      if (updatedCard.id === card.id) {
        return updatedCard;
      }

      return card;
    });

    updateCards(updatedCards);
  };

  return (
    <section className="flow">
      <h2>Cards</h2>
      <ul className="deck" role="list">
        {cards.map((card) => (
          <li key={card.id}>
            <Card
              id={card.id}
              name={card.name}
              category={card.category}
              isActive={card.isActive}
              setIsActive={toggleCardActiveState}
              updateCard={updateCard}
              deleteCard={deleteCard}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
