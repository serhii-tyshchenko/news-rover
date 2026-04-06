import { first } from 'lodash-es';

import { EEnclosureType, TEnclosure, TRawNewsItem } from '@types';

const byImageType = (enclosure: TEnclosure) =>
  enclosure.type === EEnclosureType.Image;

/**
 * Extracts the thumbnail URL from an array of enclosures.
 * It filters the enclosures to find those of type 'image/jpeg' and returns the URL of the first matching enclosure.
 * If no matching enclosure is found, it returns null.
 * @param {TEnclosure[]} enclosures - An array of enclosures to search through.
 * @returns {string | null} - The URL of the first image enclosure, or null if none is found.
 */
export const extractThumbnailUrl = (
  enclosures: TEnclosure[] = [],
): string | null => first(enclosures.filter(byImageType))?.url ?? null;

/**
 * Checks if a given response from the news API is valid by verifying that the status code is 200 (OK).
 * This function can be used to ensure that the data received from the API is successful before attempting to process it.
 * @param {Response} response - The response object returned from the news API.
 * @returns {boolean} - Returns true if the response status is 200, indicating a successful API call, otherwise false.
 */
export const isValidResponse = (response: Response): boolean =>
  response.status === 200;

/**
 * Formats the raw news data received from the API into a structured format that can be easily used in the application.
 * It maps through the raw news items and extracts relevant information such as the creation date, title, link, thumbnail URL, and description.
 * The thumbnail URL is extracted using the `extractThumbnailUrl` function, which looks for image enclosures in the news item.
 * @param {object} rawData - The raw data object received from the news API, containing an array of news items and a count of total items.
 * @return {object} - An object containing the formatted news data, including an array of news items with structured information and the total count of items.
 */
export const formatNewsResponse = (rawData: {
  data: TRawNewsItem[];
  count: number;
}) => ({
  data: rawData.data.map((item) => ({
    created: item.created,
    title: item.title,
    link: item.link,
    thumbnail: extractThumbnailUrl(item?.enclosures),
    description: item.description,
  })),
  count: rawData.count,
});
