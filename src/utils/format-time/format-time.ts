export const formatTime = (date: Date) => {
  const rawDate = new Date(date);
  const hours = rawDate.getHours().toString().padStart(2, '0');
  const minutes = rawDate.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
