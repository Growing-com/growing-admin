import ColumAttendanceRender from "@component/molecule/table/ColumAttendanceRender";
import { tAttendanceItem } from "api/attendance/types";
import { head } from "lodash";
type tColumDateTitleAttendanceRender<T> = {
  attendanceList?: T[];
};
const ColumDateTitleAttendanceRender = <DataType extends object>({
  attendanceList
}: tColumDateTitleAttendanceRender<DataType>) => {
  if (!attendanceList?.length) return {};

  const renderAddDay = (list: any[]) => {
    if (!list?.length) return [];

    const _attendanceItems = head(list);
    if (_attendanceItems?.attendanceItems?.length) {
      return _attendanceItems.attendanceItems.map((item: any) => {
        return {
          title: item.week,
          dataIndex: "attendanceItems",
          key: `attendanceItems-${item.week}`,
          align: "center",
          render: (record: tAttendanceItem[]) => {
            const findData = record.find(r => r.week === item.week);
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
