import { ELocale, TDic, TProvider } from '@types';

/**
 * Retrieves a user-friendly title for a given provider category by mapping the category identifier to a localized string from the provided dictionary (dic).
 * The function uses a predefined mapping of category identifiers to their corresponding localized titles. If a category does not have a corresponding title in the dictionary, it defaults to returning the original category identifier.
 * @param {string} category - The category identifier for which to retrieve the title.
 * @param {TDic} dic - A dictionary object containing localized strings for various categories.
 * @returns {string} - The localized title for the given category, or the original category identifier if no title is found in the dictionary.
 */
const getCategoryTitle = (category: string, dic: TDic): string => {
  const categoryToNameMap: { [key: string]: string } = {
    news: dic.category?.news,
    military: dic.category?.military,
    tech: dic.category?.technology,
    software_development: dic.category?.softwareDevelopment,
    space: dic.category?.space,
    science: dic.category?.science,
    business: dic.category?.business,
    blogs: dic.category?.blogs,
  };

  return (
    categoryToNameMap[category as keyof typeof categoryToNameMap] ?? category
  );
};

/**
 * Groups an array of news providers by their category and sorts them alphabetically within each category.
 * The function first extracts unique categories from the list of providers, then maps each category to an object containing the category name, a localized title, and a sorted array of providers belonging to that category.
 * Finally, the resulting array of category groups is sorted alphabetically by the category title.
 * This function is useful for organizing news providers in the user interface, allowing users to easily browse providers by category and find the ones they are interested in.
 * @param {TProvider[]} providers - An array of news providers to be grouped by category.
 * @param {ELocale} locale - The locale to be used for sorting the provider names and category titles.
 * @param {TDic} dic - A dictionary object containing localized strings for category titles.
 * @returns {Array<{ category: string; title: string; data: TProvider[] }>} - An array of objects, each representing a category group with its name, localized title, and sorted list of providers.
 */
export const groupProvidersByCategory = (
  providers: TProvider[] = [],
  locale: ELocale,
  dic: TDic,
): Array<{ category: string; title: string; data: TProvider[] }> =>
  [...new Set<string>(providers.map(({ category }) => category))]
    .map((category) => ({
      category,
      title: getCategoryTitle(category, dic),
      data: providers
        .filter((provider) => provider.category === category)
        .sort((a, b) => a.name.localeCompare(b.name, locale)),
    }))
    .sort((a, b) => a.title.localeCompare(b.title, locale));
