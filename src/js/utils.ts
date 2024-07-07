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
export const getRandomValue = (arr: { [key: string]: unknown }[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
