import { useEffect } from "react";
import { CardDataProps } from "@contexts/CardsContext";
import { CategoryDataProps } from "@contexts/CategoriesContext";
import CardsGroup from "@components/CardsGroup";
import { useCardsContext } from "@hooks/useCardsContext";
import { useCategoriesContext } from "@hooks/useCategoriesContext";

interface CardsListProps {
  focusGroupIndex?: number | null;
  focusCardIndex?: number | null;
  scrollPosition?: number;
  onCardClick(scrollPos: number, cardIndex: number, groupIndex: number): void;
}

/**
 * Group cards into their respective categories.
 * If a card doesn't have a category, it'll appear in an "uncategorized" group.
 * If a category doesn't contain cards, it's removed from the final output
 * @param {object[]} cards Collection of cards
 * @param {object[]} categories Collection of categories
 * @returns Card grouped by category
 */
const groupByCategory = (cards: CardDataProps[], categories: CategoryDataProps[]): Record<string, CardDataProps[]> => {
  const groups: Record<string, CardDataProps[]> = {};
  const uncategorizedLabel = "Uncategorized";

  categories.forEach(category => {
    groups[category.label] = [];
  });

  // Add a group for cards with no category
  groups[uncategorizedLabel] = [];

  cards.forEach(card => {
    const category = categories.find(c => c.id === card.category);

    if (category) {
      groups[category.label].push(card);
    } else {
      groups[uncategorizedLabel].push(card);
    }
  });

  Object.keys(groups).forEach(key => {
    if (groups[key].length === 0) {
      delete groups[key];
    }
  });

  return groups;
};

export default function CardsList({ focusGroupIndex, focusCardIndex, scrollPosition, onCardClick }: CardsListProps) {
  const { cards, setEditCardId } = useCardsContext();
  const { categories } = useCategoriesContext();
  const groupedCards = groupByCategory(cards, categories);

  const handleCardClick = (id: string, cardIndex: number, groupIndex: number) => {
    setEditCardId(id);
    onCardClick(window.scrollY, cardIndex, groupIndex);
  }

  useEffect(() => {
    if (scrollPosition === -1) {
      // Set position to end for new card
      window.scrollTo({ top: document.body.scrollHeight });
    } else {
      // Set to previous scroll position
      window.scrollTo({ top: scrollPosition });
    }
  }, [scrollPosition])

  return (
    <ul className="chips center flow flow-xl" role="list">
      {Object.keys(groupedCards).map((category, index) => (
        <CardsGroup
          key={category}
          category={category}
          cards={groupedCards[category]}
          focusIndex={focusGroupIndex === index ? focusCardIndex : null}
          onCardClick={(id, cardIndex) => handleCardClick(id, cardIndex, index)}
        />
      ))}
    </ul>
  )
}