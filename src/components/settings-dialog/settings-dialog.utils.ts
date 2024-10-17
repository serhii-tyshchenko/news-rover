export const prepareOptions = (
  arr: { [key: string]: string },
  dic: { [key: string]: string },
) =>
  Object.values(arr).map((item) => ({
    value: item,
    label: dic?.[item] || item,
  }));
