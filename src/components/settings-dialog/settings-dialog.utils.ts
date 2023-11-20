export const prepareOptions = (arr: { [key: string]: string }) =>
  Object.values(arr).map((item) => ({
    value: item,
    label: item.toUpperCase(),
  }));
