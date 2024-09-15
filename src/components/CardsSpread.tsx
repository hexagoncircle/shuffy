import { useContext, useEffect, useRef, useState } from "react";
import { CardsContext } from "@contexts/CardsContext";
import Card from "@components/Card";
import Switch from "./Switch";
import { useRovingTabIndex } from "@hooks/useRovingTabIndex";
import { refocusElement } from "@js/utils";

interface CardsSpreadProps {
  focusIndex?: number | null;
  scrollPosition: number;
  onCardClick(scrollPos: number, index: number): void;
}

export default function CardsSpread({ focusIndex, scrollPosition, onCardClick }: CardsSpreadProps) {
  const { cards, updateCard, setEditCardId } = useContext(CardsContext);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const cardsScrollRef = useRef<HTMLElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(focusIndex || 0);
  const cardsParentRef = useRef<HTMLUListElement>(null);
  const handleRovingIndex = useRovingTabIndex(cardsParentRef, activeCardIndex);

  const handleClick = (id: string, index: number) => {
    if (!cardsScrollRef.current) return;

    setEditCardId(id);
    onCardClick(cardsScrollRef.current.scrollLeft, index);
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

    const cards = cardsRef.current;
    const scrollEl = cardsScrollRef.current;

    const options = {
      root: scrollEl,
      rootMargin: '0% -50%',
      threshold: 0
    };

    if (scrollPosition === -1) {
      // Set position to end for new card
      scrollEl.scrollLeft = scrollEl.scrollWidth;
    } else {
      // Set position to selected card
      scrollEl.scrollLeft = scrollPosition;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLButtonElement;
          const index = cards.indexOf(target);

          setActiveCardIndex(index);
        }
      });
    }, options);

    focusIndex && refocusElement(cards, focusIndex);

    cards.forEach((card) => card && observer.observe(card));

    return () => {
      cards.forEach((card) => card && observer.unobserve(card));
    };
  }, [focusIndex, scrollPosition]);

  return (
    <>
      <section ref={cardsScrollRef} className="cards-wrapper scroll-x">
        <ul ref={cardsParentRef} className="cards" role="list" onKeyDown={handleRovingIndex}>
          {cards.map((card, index) => (
            <li key={card.id}>
              <Card
                card={card}
                ref={el => (cardsRef.current[index] = el)}
                selected={index === activeCardIndex}
                onClick={() => handleClick(card.id, index)}
              />
            </li>
          ))}
        </ul>
      </section>
      <section className="card-active-control cluster center">
        <label htmlFor="card-active-toggle">Card is shuffy-able</label>
        <Switch
          id="card-active-toggle"
          checked={cards[activeCardIndex]?.isActive || false}
          onChange={handleActiveChange}
        />
      </section>
    </>
  )
}