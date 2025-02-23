// type tSortOption = 'ASC' | 'DESC'

import dayjs, { Dayjs } from "dayjs";

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
  if (!valueA || !dayjs.isDayjs(valueA)) return 1;
  if (!valueB || !dayjs.isDayjs(valueB)) return -1;

  return valueA.valueOf() < valueB.valueOf()
    ? -1
    : valueA.valueOf() > valueB.valueOf()
    ? 1
    : 0;
};
