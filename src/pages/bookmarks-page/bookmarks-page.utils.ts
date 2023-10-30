export const formatTime = (date: Date) => {
  const rawDate = new Date(date);
  const month = rawDate.getMonth() + 1;
  const day = rawDate.getDate();

  return `${day}/${month}`;
};
