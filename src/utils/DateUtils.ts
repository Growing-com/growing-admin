import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";
dayjs.extend(weekOfYear);
dayjs.extend(duration);
dayjs.extend(weekday);

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

/**
 * @description 한주 번위 알려줌
 * @return start: '2022.10.09', end:'2022.10.15'
 */
const getWeekRange = () => {
  return "";
};

export { getTime, getWeekOfMonth, getTimeLine, getSundayOfMonth };
