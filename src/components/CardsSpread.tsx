import { useLayoutEffect, useRef, useState, ViewTransition } from "react";
import { refocusElement } from "@js/utils";
import { useRovingTabIndex } from "@hooks/useRovingTabIndex";
import { useCardsContext } from "@hooks/useCardsContext";
import Card from "@components/Card";
import Switch from "./Switch";
import { VIEW_TRANSITIONS } from "@js/constants";

interface CardsSpreadProps {
  focusIndex?: number | null;
  scrollPosition: number;
  onCardClick(scrollPos: number, index: number): void;
}

export default function CardsSpread({
  focusIndex,
  scrollPosition,
  onCardClick,
}: CardsSpreadProps) {
  const { cards, updateCard, setEditCardId } = useCardsContext();
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const cardsScrollRef = useRef<HTMLElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(focusIndex || 0);
  const cardsParentRef = useRef<HTMLUListElement>(null);
  const handleRovingIndex = useRovingTabIndex(cardsParentRef, activeCardIndex);

  const handleClick = (id: string, index: number) => {
    setEditCardId(id);
    onCardClick(getCardScrollPosition(index) || 0, index);
  };

  const getCardScrollPosition = (index: number) => {
    if (!cardsScrollRef.current) return;

    const cardElement = cardsRef.current[index];
    const scrollContainer = cardsScrollRef.current;

    if (!cardElement) return;

    // Calculate the card's left position relative to the scroll container
    const cardLeft = cardElement.getBoundingClientRect().left;
    const containerLeft = scrollContainer.getBoundingClientRect().left;
    const cardScrollPosition =
      cardLeft - containerLeft + scrollContainer.scrollLeft;

    // Calculate scroll position to center the card in the container
    const containerWidth = scrollContainer.clientWidth;
    const cardWidth = cardElement.offsetWidth;
    const centeredScrollPosition =
      cardScrollPosition - containerWidth / 2 + cardWidth / 2;

    return centeredScrollPosition;
  };

  const handleActiveChange = () => {
    const card = cards[activeCardIndex];

    updateCard({
      ...card,
      isActive: !card.isActive,
    });
  };

  useLayoutEffect(() => {
    const scrollEl = cardsScrollRef.current;

    if (!scrollEl) return;

    if (scrollPosition === -1) {
      // Set position to end for new card
      scrollEl.scrollLeft = scrollEl.scrollWidth;
    } else {
      // Set position to selected card
      scrollEl.scrollLeft = scrollPosition;
    }
  }, []);

  useLayoutEffect(() => {
    focusIndex && refocusElement(cardsRef.current, focusIndex);
  }, [focusIndex]);

  useLayoutEffect(() => {
    const scrollEl = cardsScrollRef.current;

    if (!scrollEl) return;

    const cards = cardsRef.current;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLButtonElement;
          const index = cards.indexOf(target);

          setActiveCardIndex(index);
        }
      });
    };

    const observerOptions = {
      root: scrollEl,
      rootMargin: "0% -50%",
      threshold: 0,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    cards.forEach((card) => card && observer.observe(card));

    return () => {
      cards.forEach((card) => card && observer.unobserve(card));
    };
  }, []);

  return (
    <ViewTransition
      default={VIEW_TRANSITIONS.slideLeft}
      update={{
        [VIEW_TRANSITIONS.none]: VIEW_TRANSITIONS.none,
      }}
    >
      <section ref={cardsScrollRef} className="cards-wrapper scroll-x">
        <ul
          ref={cardsParentRef}
          className="cards"
          role="list"
          onKeyDown={handleRovingIndex}
        >
          {cards.map((card, index) => (
            <li
              key={card.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
            >
              <Card
                card={card}
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
    </ViewTransition>
  );
}
