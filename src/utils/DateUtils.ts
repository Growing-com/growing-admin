import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";
dayjs.extend(weekOfYear);
dayjs.extend(duration);
dayjs.extend(weekday);

export const DEFAULT_DATE_FOMAT = "YYYY-MM-DD";

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

const LAST_MONDAY = -6; // 저번주 월요일
const LAST_SUNDAY = 0; // 저번주 일요일
const THIS_MONDAY = 1; // 이번주 월요일
const THIS_SUNDAY = 7; // 이번주 일요일

const getWeekDataFromToday = () => {
  return {
    lastMonday: dayjs().weekday(LAST_MONDAY).format(DEFAULT_DATE_FOMAT),
    lastSunday: dayjs().weekday(LAST_SUNDAY).format(DEFAULT_DATE_FOMAT),
    thisMonday: dayjs().weekday(THIS_MONDAY).format(DEFAULT_DATE_FOMAT),
    thisSunday: dayjs().weekday(THIS_SUNDAY).format(DEFAULT_DATE_FOMAT)
  };
};

export {
  getSundayOfMonth,
  getTime,
  getTimeLine,
  getWeekDataFromToday,
  getWeekOfMonth
};
