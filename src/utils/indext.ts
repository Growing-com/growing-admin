export const calculatePercentage = (
  part?: number,
  whole?: number,
  reverse = false
) => {
  if (part === undefined || whole === undefined) return 0;
  return reverse ? (1 - part / whole) * 100 : (part / whole) * 100;
};
