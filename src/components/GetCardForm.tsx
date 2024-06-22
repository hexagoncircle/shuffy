import { useState } from "react";
import { CardDataProps } from "./Card";
import { usePrevious } from "@uidotdev/usehooks";

interface GetCardFormProps {
  cards: CardDataProps[];
}

export default function GetCardForm({ cards }: GetCardFormProps) {
  const [newCard, setNewCard] = useState<CardDataProps>();
  const previousCard = usePrevious(newCard);

  function getRandomCard() {
    return cards[Math.floor(Math.random() * cards.length)];
  }

  const handleClick = () => {
    function getNewCard() {
      const card = getRandomCard();

      if (card === newCard) {
        getNewCard();
      } else {
        setNewCard(card);
      }
    }
    getNewCard();
  };

  return (
    <>
      <button onClick={handleClick}>Get random card</button>
      <ul>
        {newCard && <li>Current: {newCard?.name}</li>}
        {previousCard && <li style={{ opacity: 0.4 }}>Previous: {previousCard?.name}</li>}
      </ul>
    </>
  );
}
