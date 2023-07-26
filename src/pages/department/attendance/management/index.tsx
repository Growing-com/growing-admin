import { PlusCircleOutlined } from "@ant-design/icons";
import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import ExcelButton from "@component/molecule/button/ExcelButton";
import HeaderView from "@component/molecule/view/HeaderView";
import { Popover } from "antd";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import ExportExcelOfJson from "modules/excel/ExportExcelOfJson";
import { NextPage } from "next";
import { useCallback, useMemo } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { getSundayOfMonth } from "utils/DateUtils";
import FilterSearch from "./FilterSearch";
const DATA = [
  {
    cordi: "이순종",
    leader: "아이유",
    name: "박명수",
    grade: "12",
    gender: "남",
    "06/05": "100",
    "06/12": "200",
    "06/19": "300",
    "06/26": "100"
  },
  {
    cordi: "조예인",
    leader: "우상욱",
    name: "이종민",
    grade: "18",
    gender: "남",
    "06/05": "100",
    "06/12": "200",
    "06/19": "100",
    "06/26": "300"
  }
];

type tAttendStatus = "100" | "200" | "300";

type tAttendanceTable = {
  cordi: string;
  leader: string;
  name: string;
  grade: string;
  gender: string;
};

const AttendanceManagementPage: NextPage = () => {
  const renderDayComponent = (attendStatus: tAttendStatus) => {
    return (
      <Popover
        content={"오늘 배가 아파서 일찍 집에 갔습니다. "}
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

  const renderAddDay = () => {
    const sundays = getSundayOfMonth();
    return sundays.map((day: dayjs.Dayjs) => {
      const dayKey = day.format("MM/DD");
      return {
        title: dayKey,
        dataIndex: dayKey,
        key: dayKey,
        align: "center",
        render: renderDayComponent
      } as ColumnType<tAttendanceTable>;
    });
  };

  const columns: ColumnType<tAttendanceTable>[] = useMemo(
    () => [
      {
        title: "코디",
        dataIndex: "cordi",
        key: "cordi",
        align: "center",
        width: "5rem",
        fixed: "left",
        render: text => <a>{text}</a>
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
      ...renderAddDay()
    ],
    []
  );

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
        title={"출석 관리"}
        subComponent={<FilterSearch />}
        headerComponent={<ExcelButton onClickExcel={onClickExcel} />}
      />
      <GRContainerView>
        <GRTable
          rowKey={"name"}
          columns={columns}
          data={DATA}
          isHoverTable={false}
          paginationProps={{
            total: 100,
            defaultPageSize: 10
          }}
          scroll={{ x: 1300 }}
        />
      </GRContainerView>
    </>
  );
};

export default AttendanceManagementPage;
