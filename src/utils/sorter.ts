// type tSortOption = 'ASC' | 'DESC'

import { Dayjs } from "dayjs";

export const koreanSorter = (
  valueA?: string | null,
  valueB?: string | null
) => {
  if (!valueA) return 1;
  if (!valueB) return -1;
  return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
};

export const numberSorter = (valueA: number, valueB: number) => {
  return valueA - valueB;
};

export const dateSorter = (valueA: Dayjs, valueB: Dayjs) => {
  return valueA.diff(valueB) > 0 ? 1 : 0;
};
