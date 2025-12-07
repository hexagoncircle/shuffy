import { useLayoutEffect, ViewTransition } from "react";
import { groupByCategory } from "@js/utils";
import { useCardsContext } from "@hooks/useCardsContext";
import { useCategoriesContext } from "@hooks/useCategoriesContext";
import CardsGroup from "@components/CardsGroup";
import { VIEW_TRANSITIONS } from "@js/constants";

interface CardsListProps {
  focusGroupIndex?: number | null;
  focusCardIndex?: number | null;
  scrollPosition?: number;
  onCardClick(scrollPos: number, cardIndex: number, groupIndex: number): void;
}

export default function CardsList({
  focusGroupIndex,
  focusCardIndex,
  scrollPosition,
  onCardClick,
}: CardsListProps) {
  const { cards, setEditCardId } = useCardsContext();
  const { categories } = useCategoriesContext();
  const groupedCards = groupByCategory(cards, categories);

  const handleCardClick = (
    id: string,
    cardIndex: number,
    groupIndex: number
  ) => {
    setEditCardId(id);
    onCardClick(window.scrollY, cardIndex, groupIndex);
  };

  useLayoutEffect(() => {
    if (scrollPosition === -1) {
      // Set position to end for new card
      window.scrollTo({ top: document.body.scrollHeight });
    } else {
      // Set to previous scroll position
      window.scrollTo({ top: scrollPosition });
    }
  }, [scrollPosition]);

  return (
    <ViewTransition
      default={VIEW_TRANSITIONS.slideUp}
      update={{
        [VIEW_TRANSITIONS.none]: VIEW_TRANSITIONS.none,
      }}
    >
      <ul className="chips center flow flow-xl" role="list">
        {Object.keys(groupedCards).map((category, index) => (
          <CardsGroup
            key={category}
            category={category}
            cards={groupedCards[category]}
            focusIndex={focusGroupIndex === index ? focusCardIndex : null}
            onCardClick={(id, cardIndex) => {
              handleCardClick(id, cardIndex, index);
            }}
          />
        ))}
      </ul>
    </ViewTransition>
  );
}
