import { BarChartOutlined } from "@ant-design/icons";
import GRTable from "@component/base/GRTable";
import GRButtonText from "@component/base/button/GRTextButton";
import GRText from "@component/base/text/GRText";
import GRContainerView from "@component/base/view/GRContainerView";
import HeaderView from "@component/modules/view/HeaderView";
import { ColumnType } from "antd/es/table";
import { useCallback, useState } from "react";
import StatisticsCompareCards from "./StatisticsCompareCards";
import StatisticsModal from "./StatisticsModal";

type tAttendanceTable = {
  cordi: string;
  leader: string;
  name: string;
  grade: string;
  gender: string;
  "2023-05-23": string;
  "2023-05-30": string;
};

const AttendanceStatistics = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openStatisticsModal, setOpenStatisticsModal] = useState(false);

  const absentColumns: ColumnType<tAttendanceTable>[] = [
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
    },
    {
      title: "2023-05-30",
      dataIndex: "2023-05-30",
      key: "gender",
      align: "center",
      fixed: "left",
      width: "5rem"
    }
  ];

  const onClickStatistics = useCallback(() => {
    setOpenStatisticsModal(!openStatisticsModal);
  }, [openStatisticsModal]);

  return (
    <>
      <HeaderView
        title={"출석 통계"}
        headerComponent={
          <GRButtonText onClick={onClickStatistics}>
            <BarChartOutlined rev={undefined} style={{ fontSize: "1.3rem" }} />
          </GRButtonText>
        }
      />
      <GRContainerView>
        <StatisticsCompareCards />
        <GRTable
          marginBottom={2}
          headerComponent={
            <GRText weight={"bold"} fontSize={"b4"}>
              🐏 결석 인원
            </GRText>
          }
          columns={absentColumns}
        />
        <GRTable
          headerComponent={
            <GRText weight={"bold"} fontSize={"b4"}>
              🌱 새가족 인원
            </GRText>
          }
          columns={absentColumns}
        />
      </GRContainerView>
      <StatisticsModal
        onClickStatistics={onClickStatistics}
        open={openStatisticsModal}
      />
    </>
  );
};

export default AttendanceStatistics;
