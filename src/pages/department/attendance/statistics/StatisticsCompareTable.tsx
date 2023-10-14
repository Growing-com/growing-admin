import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import ColumAttendanceRender from "@component/templates/table/ColumAttendanceRender";
import ColumSexRender from "@component/templates/table/ColumSexRender";
import { ColumnType } from "antd/es/table";
import { tGetStatisticsAttendanceResponse } from "api/statistics";
import { getWeekDataFromToday } from "utils/DateUtils";

type tStatisticsCompareTable = {
  headerTitle: string;
  data?: tGetStatisticsAttendanceResponse[];
};

const StatisticsCompareTable = ({
  headerTitle,
  data
}: tStatisticsCompareTable) => {
  const { lastSunday, thisSunday } = getWeekDataFromToday();

  const absentColumns: ColumnType<tGetStatisticsAttendanceResponse>[] = [
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
      sorter: (a, b) => a.grade - b.grade
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

  return (
    <GRTable
      rowKey={"name"}
      marginbottom={2}
      headerComponent={
        <GRText
          weight={"bold"}
          fontSize={"b4"}
          marginright={0.5}
          marginbottom={1}
        >
          {headerTitle}
        </GRText>
      }
      columns={absentColumns}
      data={data}
      scroll={{ y: 200 }}
    />
  );
};

export default StatisticsCompareTable;
