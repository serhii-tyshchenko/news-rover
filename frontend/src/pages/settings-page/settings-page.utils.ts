export const prepareOptions = (
  options: Record<string, string>,
  dic: Record<string, string>,
) =>
  Object.values(options).map((item) => ({
    value: item,
    label: dic?.[item] ?? item,
  }));
