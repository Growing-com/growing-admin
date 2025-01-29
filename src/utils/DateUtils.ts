import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";
dayjs.extend(weekOfYear);
dayjs.extend(duration);
dayjs.extend(weekday);

export const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
export const DEFAULT_EXCEL_DATE_FORMAT = "YYYY-MM-DD_HH-mm-ss";

const convertDateStringByDefaultForm = (date: Dayjs) => {
  if (!date) return date;
  return date.format(DEFAULT_DATE_FORMAT);
};

const getTime = (date: dayjs.Dayjs | string) => {
  const mille = dayjs().diff(date);
  const D = Math.floor(mille / (1000 * 60 * 60 * 24));
  const H = Math.floor((mille / (1000 * 60 * 60)) % 24);
  const M = Math.floor((mille / (1000 * 60)) % 60);
  return { D, H, M };
};

/**
 * @description Date로 들어오는 날짜가 몇주차 인지 '8월 1주차'
 * @param date '2022-12-22'
 */
const getWeekOfMonth = (date: dayjs.Dayjs | string) => {
  const weekOfMonth = dayjs(date).week() - dayjs().startOf("M").week() + 1;
  const month = dayjs().month() + 1;
  return `${month}월 ${weekOfMonth}주차`;
};

/**
 * @description 현재 시간하고 비교해서
 * @return 방금 | 2분 | 12.22
 * @param date '2022-12-22'
 */
const getTimeLine = (date: dayjs.Dayjs | string) => {
  const { D, H, M } = getTime(date);
  if (D > 0) return `${dayjs(date).format("MM.DD")}`;
  if (H > 0) return `${H}시간`;
  if (M > 0) return `${M}분`;
  return `방금`;
};

const getSundayOfMonth = (_date?: dayjs.Dayjs | string) => {
  if (!_date) _date = dayjs().startOf("M");
  const numberWeekend =
    dayjs(_date).endOf("M").week() - dayjs(_date).startOf("M").week();
  const startWeek = dayjs().startOf("M").weekday(8);
  const sundays = [startWeek];
  for (let i = 1; i < numberWeekend; i++) {
    sundays.push(startWeek.add(7 * i, "day"));
  }
  return sundays;
};

const getSundayRangeDate = (_startDate?: string, _endDate?: string) => {
  if (!_startDate || !_endDate) return [];
  const week = [] as string[];
  const startDate = dayjs(_startDate);
  const endDate = dayjs(_endDate);
  let currentDay = startDate;
  while (currentDay.isBefore(endDate) || currentDay.isSame(endDate, "day")) {
    if (currentDay.day() === 0) {
      const sundayStart = currentDay.startOf("day");
      week.push(sundayStart.format(DEFAULT_DATE_FORMAT));
    }
    currentDay = currentDay.add(1, "day");
  }
  return week;
};

const LAST_LAST_MONDAY = -12; // 지지난주 월요일
const LAST_LAST_SUNDAY = -7; // 지지난주 일요일
const LAST_MONDAY = -6; // 지난주 월요일
const LAST_SUNDAY = 0; // 지난주 일요일
const LAST_SATURDAY = -1; // 지난주 토요일
const THIS_MONDAY = 1; // 이번주 월요일
const THIS_SUNDAY = 7; // 이번주 일요일
const THIS_SATURDAY = 6; // 이번주 토요일

const getWeekDataFromToday = {
  today: dayjs().format(DEFAULT_DATE_FORMAT),
  lastlastMonday: dayjs().weekday(LAST_LAST_MONDAY).format(DEFAULT_DATE_FORMAT),
  lastlastSunday: dayjs().weekday(LAST_LAST_SUNDAY).format(DEFAULT_DATE_FORMAT),
  lastMonday: dayjs().weekday(LAST_MONDAY).format(DEFAULT_DATE_FORMAT),
  lastSunday: dayjs().weekday(LAST_SUNDAY).format(DEFAULT_DATE_FORMAT),
  lastSaturday: dayjs().weekday(LAST_SATURDAY).format(DEFAULT_DATE_FORMAT),
  thisMonday: dayjs().weekday(THIS_MONDAY).format(DEFAULT_DATE_FORMAT),
  thisSunday: dayjs().weekday(THIS_SUNDAY).format(DEFAULT_DATE_FORMAT),
  thisSaturday: dayjs().weekday(THIS_SATURDAY).format(DEFAULT_DATE_FORMAT)
};

const checkDefaultDate = (_date: string) => {
  return _date !== "1970-01-01" ? _date : "-";
};

export {
  checkDefaultDate,
  convertDateStringByDefaultForm,
  getSundayOfMonth,
  getSundayRangeDate,
  getTime,
  getTimeLine,
  getWeekDataFromToday,
  getWeekOfMonth
};
