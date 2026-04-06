/**
 * Prepares an array of options for a select input by mapping the values of a given options object to an array of objects with 'value' and 'label' properties.
 * The 'label' property is derived from a provided dictionary (dic) that contains localized strings. If a corresponding label is not found in the dictionary, it defaults to using the original value.
 * This function is useful for transforming a simple key-value pair object into a format that can be easily consumed by UI components, such as dropdowns or select inputs, while also supporting localization.
 * @param {Record<string, string>} options - An object containing key-value pairs where the values represent the options to be prepared.
 * @param {Record<string, string>} dic - A dictionary object containing localized strings for the option values.
 * @returns {Array<{ value: string; label: string }>} - An array of objects, each containing a 'value' and a 'label' property, ready to be used in select inputs.
 */
export const prepareOptions = (
  options: Record<string, string>,
  dic: Record<string, string>,
): Array<{ value: string; label: string }> =>
  Object.values(options).map((item) => ({
    value: item,
    label: dic?.[item] ?? item,
  }));
