import ColumAttendanceRender from "@component/molecule/table/ColumAttendanceRender";
import {
  tAttendanceCheckListItem,
  tAttendanceItem
} from "api/attendance/types";
import dayjs from "dayjs";
import { head } from "lodash";
type tColumDateTitleAttendanceRender<T> = {
  attendanceList?: T[];
};
const ColumDateTitleAttendanceRender = <DataType extends object>({
  attendanceList
}: tColumDateTitleAttendanceRender<DataType>) => {
  if (!attendanceList?.length) return {};

  const filterWeeks = (attendData: tAttendanceCheckListItem[]) => {
    const weeks = [] as string[];
    attendData.forEach(attend => {
      const { attendanceItems } = attend;
      attendanceItems.forEach(item => {
        if (item.week && !weeks.includes(item.week)) {
          weeks.push(item.week);
        }
      });
    });
    weeks.sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? 1 : -1));
    return weeks;
  };

  const renderAddDay = (list: any[]) => {
    if (!list?.length) return [];

    const _attendanceItems = head(list);
    const _weeks = filterWeeks(list);

    if (_attendanceItems?.attendanceItems?.length) {
      return _weeks.map(week => {
        return {
          title: week,
          dataIndex: "attendanceItems",
          key: `attendanceItems-${week}`,
          align: "center",
          render: (record: tAttendanceItem[]) => {
            const findData = record.find(r => r.week === week);
            return (
              <ColumAttendanceRender
                attendanceStatus={findData?.status}
                contentEtc={findData?.etc}
              />
            );
          }
        };
      });
    }
    return [];
  };

  return {
    title: "출석 날짜",
    align: "center",
    children: renderAddDay(attendanceList)
  };
};

export default ColumDateTitleAttendanceRender;
