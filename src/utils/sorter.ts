// type tSortOption = 'ASC' | 'DESC'

export const koreanSorter = (valueA: string, valueB: string) => {
  return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
};

export const numberSorter = (valueA: number, valueB: number) => {
  return valueA - valueB;
};
