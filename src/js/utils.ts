import { CardDataProps } from "@contexts/CardsContext";
import { CategoryDataProps } from "@contexts/CategoriesContext";

/**
 * Set singular or plural text string based on count.
 * @param {string} singular
 * @param {string} plural
 * @param {number} count
 * @returns singular if count is 1, otherwise return plural text.
 */
export function pluralize(singular: string, plural: string, count: number) {
  return count === 1 ? singular : plural;
}

/**
 * Randomly select an index in an array.
 * @param {array} arr The array to randomize.
 * @returns Value from a random index.
 */
export const getRandomValue = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Find an object in an array that contains an id property with value
 * @param {string} id The unique identifier
 * @returns Object with matching id if it exists
 */
export const getItemById = <T extends { id: string }>(arr: T[], id: string): T | undefined => {
  return arr.find((obj) => obj.id === id);
};

/**
 * Group cards into their respective categories.
 * If a card doesn't have a category, it'll appear in an "uncategorized" group.
 * If a category doesn't contain cards, it's removed from the final output
 * @param {object[]} cards Collection of cards
 * @param {object[]} categories Collection of categories
 * @returns Card grouped by category
 */
export const groupByCategory = (
  cards: CardDataProps[],
  categories: CategoryDataProps[]
): Record<string, CardDataProps[]> => {
  const groups: Record<string, CardDataProps[]> = {};
  const uncategorizedLabel = "Uncategorized";

  categories.forEach((category) => {
    groups[category.label] = [];
  });

  // Add a group for cards with no category
  groups[uncategorizedLabel] = [];

  cards.forEach((card) => {
    const category = categories.find((c) => c.id === card.category);

    if (category) {
      groups[category.label].push(card);
    } else {
      groups[uncategorizedLabel].push(card);
    }
  });

  Object.keys(groups).forEach((key) => {
    if (groups[key].length === 0) {
      delete groups[key];
    }
  });

  return groups;
};

/**
 * Utility to refocus an element, like a card, after editing/deleting.
 * If item is deleted at the last index, focus previous index.
 * @param {HTMLElement[]} arr An array of focusable elements.
 * @param {number} focusIndex The element that should be focused.
 */
export const refocusElement = (arr: (HTMLElement | null)[], focusIndex: number) => {
  if (!arr) return;

  const index = arr[focusIndex] ? focusIndex : focusIndex - 1;
  arr[index]?.focus({ preventScroll: true });
};
