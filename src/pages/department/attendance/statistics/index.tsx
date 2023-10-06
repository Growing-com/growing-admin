import { BarChartOutlined, FileExcelOutlined } from "@ant-design/icons";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRView from "@component/atom/view/GRView";
import HeaderView from "@component/molecule/view/HeaderView";
import { Dropdown } from "antd";
import { useStatisticsAttendanceSummaryQuery } from "api/statistics/queries/useStatisticsAttendanceSummaryQuery";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";
import StatisticsAbsentTable from "./StatisticsAbsentTable";
import StatisticsCompareCards from "./StatisticsCompareCards";
import StatisticsModal from "./StatisticsModal";
import StatisticsNewFamilyTable from "./StatisticsNewFamilyTable";

const LAST_SUNDAY = 0;
const THIS_SUNDAY = 7;

const AttendanceStatistics = () => {
  const [openStatisticsModal, setOpenStatisticsModal] = useState(false);
  const { data: statisticsAttendanceSummaryData } =
    useStatisticsAttendanceSummaryQuery({
      startDate: dayjs().weekday(LAST_SUNDAY).format(DEFAULT_DATE_FOMAT),
      endDate: dayjs().weekday(THIS_SUNDAY).format(DEFAULT_DATE_FOMAT)
    });

  const onClickStatistics = useCallback(() => {
    setOpenStatisticsModal(!openStatisticsModal);
  }, [openStatisticsModal]);

  // const onClickExcel = useCallback(async () => {
  //   try {
  //     await ExportExcelOfJson({ data: DATA });
  //   } catch (e) {
  //     console.error("Error", e);
  //   }
  // }, []);

  // const renderDayComponent = (attendStatus: tAttendStatus) => {
  //   return (
  //     <Popover
  //       content={"오늘 배가 아파서 일찍 집에 갔습니다."}
  //       trigger={"click"}
  //     >
  //       <GRButtonText buttonType={"default"}>
  //         <PlusCircleOutlined
  //           rev={undefined}
  //           style={{ marginRight: `${GRStylesConfig.BASE_MARGIN}rem` }}
  //         />
  //         <GRText>{attendStatus === "100" ? "출석" : "결석"}</GRText>
  //       </GRButtonText>
  //     </Popover>
  //   );
  // };

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      )
    }
  ];

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
            <GRView>
              <Dropdown.Button
                menu={{
                  items
                }}
                placement="bottomLeft"
                arrow
              >
                <FileExcelOutlined
                  rev={undefined}
                  style={{ fontSize: "1rem", marginRight: "0.3rem" }}
                />
              </Dropdown.Button>
            </GRView>
            {/* <ExcelButton onlyIcon size={"small"} onClickExcel={onClickExcel} /> */}
          </>
        }
      />
      <GRContainerView>
        <StatisticsCompareCards
          statisticsAttendanceSummaryData={statisticsAttendanceSummaryData}
        />
        <StatisticsAbsentTable />
        <StatisticsNewFamilyTable />
      </GRContainerView>
      <StatisticsModal
        onClickStatistics={onClickStatistics}
        open={openStatisticsModal}
      />
    </>
  );
};

export default AttendanceStatistics;
