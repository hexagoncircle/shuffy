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
