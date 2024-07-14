import { useContext } from "react";
import { CardDataProps, CardsContext } from "@components/CardsContext";
import { CategoriesContext, CategoryDataProps } from "@components/CategoriesContext";
import CardsGroup from "@components/CardsGroup";

interface CardsListProps {
  onCardClick(id: string): void;
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

export default function CardsList({ onCardClick }: CardsListProps) {
  const { cards } = useContext(CardsContext);
  const { categories } = useContext(CategoriesContext);
  const groupedCards = groupByCategory(cards, categories);

  return (
    <ul className="chips center flow flow-xl" role="list">
      {Object.keys(groupedCards).map(category => (
        <CardsGroup
          key={category}
          category={category}
          cards={groupedCards[category]}
          onCardClick={onCardClick}
        />
      ))}
    </ul>
  )
}