export const calculatePercentage = (part?: number, whole?: number) => {
  if (!part || !whole) return 0;
  return (part / whole) * 100;
};
