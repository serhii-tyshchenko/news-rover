/**
 * Capitalizes the first letter of a given string.
 * This function takes a string as input and returns a new string with the first character converted to uppercase, while the rest of the characters remain unchanged.
 * @param {string} str - The input string that needs to be transformed.
 * @returns {string} - A new string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);
