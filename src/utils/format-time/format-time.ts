export const formatTime = (dateRaw: number) => {
  const rawDate = new Date(dateRaw);
  const hours = rawDate.getHours().toString().padStart(2, '0');
  const minutes = rawDate.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
