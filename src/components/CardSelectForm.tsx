import { useState } from "react";
import { usePrevious } from "@uidotdev/usehooks";
import { CardDataProps } from "@components/Card";

interface CardSelectFormProps {
  cards: CardDataProps[];
}

export default function CardSelectForm({ cards }: CardSelectFormProps) {
  const [card, setCard] = useState<CardDataProps>();
  const previousCard = usePrevious(card);

  function getRandomCard() {
    return cards[Math.floor(Math.random() * cards.length)];
  }

  const handleClick = () => {
    function getCard() {
      const card = getRandomCard();

      if (card === card) {
        getCard();
      } else {
        setCard(card);
      }
    }
    getCard();
  };

  return (
    <>
      <button onClick={handleClick}>Get random card</button>
      <ul>
        {card && <li>Current: {card?.name}</li>}
        {previousCard && <li style={{ opacity: 0.4 }}>Previous: {previousCard?.name}</li>}
      </ul>
    </>
  );
}
