import ColumAttendanceRender from "@component/molecule/table/ColumAttendanceRender";
import { tAttendanceItem } from 'hooks/useStatisticsDataToExcel';

import { head } from "lodash";
type tColumDateTitleAttendanceRender<T> = {
  attendanceList?: T[];
  weeks: string[];
};
const ColumDateTitleAttendanceRender = <DataType extends object>({
  attendanceList,
  weeks
}: tColumDateTitleAttendanceRender<DataType>) => {
  if (!attendanceList?.length) return {};

  const renderAddDay = (list: any[]) => {
    if (!list?.length) return [];

    const _attendanceItems = head(list);

    if (_attendanceItems?.attendanceItems?.length) {
      return weeks.map(week => {
        return {
          title: week,
          dataIndex: "attendanceItems",
          key: `attendanceItems-${week}`,
          align: "center",
          render: (record: tAttendanceItem[]) => {
            const findData = record.find(r => r.week === week);
            return (
              <ColumAttendanceRender
                key={`${week}-${findData?.attendanceId}`}
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
