import { BarChartOutlined, PlusCircleOutlined } from "@ant-design/icons";
import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import ExcelButton from "@component/molecule/button/ExcelButton";
import HeaderView from "@component/molecule/view/HeaderView";
import { Popover } from "antd";
import { ColumnType } from "antd/es/table";
import ExportExcelOfJson from "modules/excel/ExportExcelOfJson";
import { useCallback, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
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

const DATA = [
  {
    cordi: "이순종",
    leader: "아이유",
    name: "박명수",
    grade: "12",
    gender: "남",
    "2023-05-23": "100",
    "2023-05-30": "200"
  },
  {
    cordi: "조예인",
    leader: "우상욱",
    name: "이종민",
    grade: "18",
    gender: "남",
    "2023-05-23": "100",
    "2023-05-30": "200"
  }
];
type tAttendStatus = "100" | "200" | "300";

const AttendanceStatistics = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openStatisticsModal, setOpenStatisticsModal] = useState(false);

  const renderDayComponent = (attendStatus: tAttendStatus) => {
    return (
      <Popover
        content={"오늘 배가 아파서 일찍 집에 갔습니다."}
        trigger={"click"}
      >
        <GRButtonText buttonType={"default"}>
          <PlusCircleOutlined
            rev={undefined}
            style={{ marginRight: `${GRStylesConfig.BASE_MARGIN}rem` }}
          />
          <GRText>{attendStatus === "100" ? "출석" : "결석"}</GRText>
        </GRButtonText>
      </Popover>
    );
  };

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
      width: "5rem",
      render: renderDayComponent
    },
    {
      title: "2023-05-30",
      dataIndex: "2023-05-30",
      key: "gender",
      align: "center",
      fixed: "left",
      width: "5rem",
      render: renderDayComponent
    }
  ];

  const onClickStatistics = useCallback(() => {
    setOpenStatisticsModal(!openStatisticsModal);
  }, [openStatisticsModal]);

  const onClickExcel = useCallback(async () => {
    try {
      await ExportExcelOfJson({ data: DATA });
    } catch (e) {
      console.error("Error", e);
    }
  }, []);

  return (
    <>
      <HeaderView
        title={"출석 통계"}
        headerComponent={
          <>
            <GRButtonText
              onClick={onClickStatistics}
              buttonType={"default"}
              size={"large"}
              marginright={GRStylesConfig.BASE_MARGIN}
            >
              <BarChartOutlined
                rev={undefined}
                style={{ fontSize: "1rem", marginRight: "0.5rem" }}
              />
              그룹별 통계
            </GRButtonText>
            <ExcelButton onlyIcon size={"small"} onClickExcel={onClickExcel} />
          </>
        }
      />
      <GRContainerView>
        <StatisticsCompareCards />
        <GRTable
          rowKey={"name"}
          marginbottom={2}
          headerComponent={
            <GRText weight={"bold"} fontSize={"b4"}>
              🐏 결석 인원
            </GRText>
          }
          columns={absentColumns}
          data={DATA}
        />
        <GRTable
          rowKey={"name"}
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
