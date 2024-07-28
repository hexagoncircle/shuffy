import { useContext, useEffect, useRef, useState } from "react";
import { CardsContext } from "@components/CardsContext";
import Card from "@components/Card";
import Switch from "./Switch";
import useRovingTabIndex from "@hooks/useRovingTabIndex";
import useIsMounted from "@hooks/useIsMounted";

interface CardsSpreadProps {
  focusIndex?: number;
  scrollPosition: number;
  onClick(scrollPos: number, index: number): void;
}

export default function CardsSpread({ focusIndex, scrollPosition, onClick }: CardsSpreadProps) {
  const { cards, updateCard, setEditCardId } = useContext(CardsContext);
  const isMounted = useIsMounted();
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const cardsScrollRef = useRef<HTMLElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(focusIndex || 0);
  const cardsParentRef = useRef<HTMLUListElement>(null);
  const handleRovingIndex = useRovingTabIndex(cardsParentRef, activeCardIndex);

  const handleClick = (id: string, index: number) => {
    if (!cardsScrollRef.current) return;

    setEditCardId(id);
    onClick(cardsScrollRef.current.scrollLeft, index);
  }

  const handleActiveChange = () => {
    const card = cards[activeCardIndex];

    updateCard({
      ...card,
      isActive: !card.isActive
    });
  }

  useEffect(() => {
    // if (!isMounted) return;

    if (!focusIndex || !cardsScrollRef.current) return;

    cardsRef?.current[focusIndex]?.focus();
    cardsScrollRef.current.scrollLeft = scrollPosition;
  }, [focusIndex, isMounted, scrollPosition])

  useEffect(() => {
    if (!cardsScrollRef.current) return;

    const scrollContainer = cardsScrollRef.current;
    const cards = cardsRef.current;
    const options = {
      root: cardsScrollRef.current,
      rootMargin: '0% -50%',
      threshold: 0
    };

    if (scrollPosition === -1) {
      // Set position to end for new card
      scrollContainer.scrollLeft = scrollContainer.scrollWidth;
    } else {
      // Set position to last edited card
      scrollContainer.scrollLeft = scrollPosition;
    }

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
        <Switch id="card-active-toggle" checked={cards[activeCardIndex].isActive} onChange={handleActiveChange} />
      </section>
    </>
  )
}