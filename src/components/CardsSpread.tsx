import {
  KeyboardEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  ViewTransition,
} from "react";
import mergeRefs from "merge-refs";
import { VIEW_TRANSITIONS } from "@js/constants";
import { refocusElement } from "@js/utils";
import { CardDataProps } from "@contexts/CardsContext";
import { useCardsContext } from "@hooks/useCardsContext";
import { useRovingFocus } from "@hooks/useRovingFocus";
import { useScrollEnd } from "@hooks/useScrollEnd";
import Card from "@components/Card";
import Switch from "./Switch";

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
  const [activeCardIndex, setActiveCardIndex] = useState(focusIndex || 0);
  const [isScrolling, setIsScrolling] = useState(false);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const cardsScrollElRef = useRef<HTMLElement>(null);
  const cardsParentRef = useRef<HTMLUListElement>(null);
  const activeCardRef = useRef<CardDataProps>(cards[activeCardIndex]);
  const {
    rovingFocusContainerRef,
    rovingFocusOnKeyDown,
    rovingFocusItemProps,
    currentIndex: rovingFocusIndex,
  } = useRovingFocus<HTMLUListElement>({ initialIndex: activeCardIndex });

  const handleClick = (id: string, index: number) => {
    setEditCardId(id);
    onCardClick(getCardScrollPosition(index) || 0, index);
  };

  const getCardScrollPosition = (index: number) => {
    if (!cardsScrollElRef.current) return;

    const cardElement = cardsRef.current[index];
    const scrollContainer = cardsScrollElRef.current;

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
    const updatedCard = {
      ...card,
      isActive: !card.isActive,
    };

    activeCardRef.current = updatedCard;
    updateCard(updatedCard);
  };

  useLayoutEffect(() => {
    const scrollEl = cardsScrollElRef.current;

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
    if (focusIndex != null) {
      refocusElement(cardsRef.current, focusIndex);
    }
  }, [focusIndex]);

  useLayoutEffect(() => {
    const scrollEl = cardsScrollElRef.current;
    const cards = cardsRef.current;

    if (!scrollEl || !cards) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLButtonElement;
          const index = cards.indexOf(target);

          setIsScrolling(true);
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

  useEffect(() => {
    // Sync rovingFocusIndex with activeCardIndex when arrow keys are used
    if (rovingFocusIndex !== activeCardIndex && cards[rovingFocusIndex]) {
      setActiveCardIndex(rovingFocusIndex);
      activeCardRef.current = cards[rovingFocusIndex];
    }
  }, [rovingFocusIndex, cards]);

  useEffect(() => {
    // Wait for scrollend before updating ref to avoid flicker of Switch checked state when scrolling cards quickly.
    if (!isScrolling) {
      activeCardRef.current = cards[activeCardIndex];
    }
  }, [isScrolling, activeCardIndex]);

  useScrollEnd(() => {
    setIsScrolling(false);
    activeCardRef.current = cards[activeCardIndex];
  }, cardsScrollElRef);

  return (
    <ViewTransition
      default={VIEW_TRANSITIONS.slideLeft}
      update={{
        [VIEW_TRANSITIONS.none]: VIEW_TRANSITIONS.none,
      }}
    >
      <section ref={cardsScrollElRef} className="cards-wrapper scroll-x">
        <ul
          ref={mergeRefs(cardsParentRef, rovingFocusContainerRef)}
          onKeyDown={rovingFocusOnKeyDown}
          className="cards"
          role="list"
        >
          {cards.map((card, index) => (
            <li key={card.id}>
              <Card
                card={card}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                selected={index === activeCardIndex}
                onClick={() => handleClick(card.id, index)}
                {...rovingFocusItemProps}
              />
            </li>
          ))}
        </ul>
      </section>
      <section className="card-active-control cluster center">
        <label htmlFor="card-active-toggle">Card is shuffy-able</label>
        <Switch
          id="card-active-toggle"
          checked={!!activeCardRef.current?.isActive}
          onChange={handleActiveChange}
        />
      </section>
    </ViewTransition>
  );
}
