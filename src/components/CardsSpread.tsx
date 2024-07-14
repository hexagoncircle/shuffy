import { useContext, useEffect, useRef, useState } from "react";
import { CardsContext } from "@components/CardsContext";
import Card from "@components/Card";
import Switch from "./Switch";

interface CardsSpreadProps {
  scrollPosition: number;
  onClick(scrollPosition: number): void;
}

export default function CardsSpread({ onClick, scrollPosition }: CardsSpreadProps) {
  const { cards, updateCard, setEditCardId } = useContext(CardsContext);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const cardsScrollRef = useRef<HTMLElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleClick = (id: string) => {
    if (!cardsScrollRef.current) return;

    setEditCardId(id);
    onClick(cardsScrollRef.current.scrollLeft);
  }

  const handleActiveChange = () => {
    const card = cards[activeCardIndex];

    updateCard({
      ...card,
      isActive: !card.isActive
    });
  }

  useEffect(() => {
    if (!cardsScrollRef.current) return;

    const scrollContainer = cardsScrollRef.current;

    if (scrollPosition === -1) {
      // Set position to end for new card
      scrollContainer.scrollLeft = scrollContainer.scrollWidth;
    } else {
      // Set position to edited card
      scrollContainer.scrollLeft = scrollPosition;
    }


    const cards = cardsRef.current;
    const options = {
      root: cardsScrollRef.current,
      rootMargin: '0% -50%',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cards.indexOf(entry.target as HTMLButtonElement);
          setActiveCardIndex(index);
        }
      });
    }, options);

    cards.forEach((card) => {
      card && observer.observe(card);
    });

    return () => {
      cards.forEach((card) => {
        card && observer.unobserve(card);
      });
    };
  }, [scrollPosition]);

  return (
    <>
      <section ref={cardsScrollRef} className="cards-wrapper scroll-x">
        <ul className="cards" role="list">
          {cards.map((card, index) => (
            <li key={card.id}>
              <Card
                card={card}
                ref={el => (cardsRef.current[index] = el)}
                selected={index === activeCardIndex}
                onClick={() => handleClick(card.id)}
              />
            </li>
          ))}
        </ul>
      </section>
      <section className="card-active-control cluster center">
        <label htmlFor="card-active-toggle">Card is shuffy-able</label>
        <Switch id="card-active-toggle" checked={cards[activeCardIndex].isActive} onChange={handleActiveChange} />
      </section>
    </>
  )
}