import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import { ColumnType } from "antd/es/table";
import { useStatisticsAttendance } from "api/statistics/queries/useStatisticsAttendance";
import dayjs from "dayjs";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";

type tAttendanceTable = {
  cordi: string;
  leader: string;
  name: string;
  grade: string;
  gender: string;
  "2023-05-23": string;
  "2023-05-30": string;
};

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

  const absentColumns: ColumnType<any>[] = [
    {
      title: "코디",
      dataIndex: "cordi",
      key: "cordi",
      align: "center",
      width: "5rem",
      fixed: "left",
      render: (_, item) => <a>{item.cordi}</a>
    },
    {
      title: "순장",
      dataIndex: "leader",
      key: "leader",
      align: "center",
      fixed: "left",
      width: "5rem"
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
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
      width: "5rem"
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      fixed: "left",
      width: "5rem"
    },
    {
      title: "2023-05-23",
      dataIndex: "2023-05-23",
      key: "gender",
      align: "center",
      fixed: "left",
      width: "5rem"
      // render: renderDayComponent
    },
    {
      title: "2023-05-30",
      dataIndex: "2023-05-30",
      key: "gender",
      align: "center",
      fixed: "left",
      width: "5rem"
      // render: renderDayComponent
    }
  ];

  return (
    <GRTable
      rowKey={"name"}
      marginbottom={2}
      headerComponent={
        <GRText weight={"bold"} fontSize={"b4"}>
          🐏 결석 인원
        </GRText>
      }
      columns={absentColumns}
      data={statisticsAbsentData as any[]}
    />
  );
};

export default StatisticsAbsentTable;
