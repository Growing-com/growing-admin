import { tOptions } from "@component/atom/dataEntry/type";

export const calculatePercentage = (
  part?: number,
  whole?: number,
  reverse = false
) => {
  if (part === undefined || whole === undefined) return 0;
  return reverse ? (1 - part / whole) * 100 : (part / whole) * 100;
};

export const convertOptions = (
  data: any[],
  valueKey: string,
  labelKey: string
): tOptions[] => {
  if (!data.length) return [];
  return data.map(item => ({
    value: item[valueKey],
    label: item[labelKey]
  }));
};
