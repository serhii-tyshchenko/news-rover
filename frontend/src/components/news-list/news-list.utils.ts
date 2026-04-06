import { TNewsItem } from '@types';

/**
 * Checks if a given news item is bookmarked by comparing its link with the links of the bookmarked items.
 * This function takes an array of bookmarked news items and a single news item as input, and returns true if the news item is found in the bookmarks, otherwise false.
 * @param {Array<TNewsItem>} bookmarks - An array of news items that have been bookmarked by the user.
 * @param {TNewsItem} item - The news item that needs to be checked against the bookmarks.
 * @returns {boolean} - Returns true if the news item is bookmarked, otherwise false.
 * This function can be used to determine whether to display a bookmarked state (e.g., a filled bookmark icon) for a news item in the user interface.
 */
export const checkIfBookmarked = (
  bookmarks: Array<TNewsItem>,
  item: TNewsItem,
): boolean => bookmarks?.some((bookmark) => bookmark.link === item.link);
