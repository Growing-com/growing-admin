import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import ColumAttendanceRender from "@component/templates/table/ColumAttendanceRender";
import ColumSexRender from "@component/templates/table/ColumSexRender";
import { ColumnType } from "antd/es/table";
import { useStatisticsAttendance } from "api/statistics/queries/useStatisticsAttendance";
import dayjs from "dayjs";
import { useCallback } from "react";
import { DEFAULT_DATE_FOMAT, getWeekDataFromToday } from "utils/DateUtils";

const LAST_SUNDAY = 0;
const THIS_SUNDAY = 7;

const StatisticsAbsentTable = () => {
  const { data: statisticsAbsentData } = useStatisticsAttendance(
    {
      startDate: dayjs().weekday(LAST_SUNDAY).format(DEFAULT_DATE_FOMAT),
      endDate: dayjs().weekday(THIS_SUNDAY).format(DEFAULT_DATE_FOMAT),
      isAbsent: true
    },
    "isAbsent"
  );
  const { lastSunday, thisSunday } = getWeekDataFromToday();

  const absentColumns: ColumnType<any>[] = [
    {
      title: "코디",
      dataIndex: "managerName",
      key: "managerName",
      align: "center",
      width: "5rem",
      fixed: "left"
    },
    {
      title: "순장",
      dataIndex: "leaderName",
      key: "leaderName",
      align: "center",
      fixed: "left",
      width: "5rem"
    },
    {
      title: "이름",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      fixed: "left",
      width: "5rem"
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      fixed: "left",
      width: "5rem",
      sorter: (a, b) => parseInt(a.grade) - parseInt(b.grade)
    },
    {
      title: "성별",
      dataIndex: "sex",
      key: "sex",
      align: "center",
      fixed: "left",
      width: "5rem",
      render: (_, record) => <ColumSexRender sexData={record.sex} />
    },
    {
      title: lastSunday,
      key: "gender",
      align: "center",
      fixed: "left",
      width: "5rem",
      render: () => (
        <ColumAttendanceRender attendanceStatus={"ABSENT"} contentEtc="" />
      )
    },
    {
      title: thisSunday,
      key: "gender",
      align: "center",
      fixed: "left",
      width: "5rem",
      render: () => (
        <ColumAttendanceRender attendanceStatus={"ABSENT"} contentEtc="" />
      )
    }
  ];

  const onClickExcel = useCallback(() => {}, [statisticsAbsentData]);

  return (
    <GRTable
      rowKey={"name"}
      marginbottom={2}
      headerComponent={
        <GRText weight={"bold"} fontSize={"b4"} marginright={0.5}>
          🐏 결석 인원
        </GRText>
      }
      columns={absentColumns}
      data={statisticsAbsentData as any[]}
      scroll={{ y: 200 }}
    />
  );
};

export default StatisticsAbsentTable;
