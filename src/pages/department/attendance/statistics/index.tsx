import { BarChartOutlined, FileExcelOutlined } from "@ant-design/icons";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRView from "@component/atom/view/GRView";
import HeaderView from "@component/molecule/view/HeaderView";
import { Dropdown } from "antd";
import { useAttendanceBenchMutate } from "api/statistics/mutate/useAttendanceBenchMutate";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";
import StatisticsAbsentTable from "./StatisticsAbsentTable";
import StatisticsCompareCards from "./StatisticsCompareCards";
import StatisticsModal from "./StatisticsModal";
import StatisticsNewFamilyTable from "./StatisticsNewFamilyTable";

export type tStatisticsAttendanceExcelOption =
  | "personalAttendance"
  | "leaderAttendance"
  | "managerAttendance"
  | "gradeAttendance";

const AttendanceStatistics = () => {
  const [openStatisticsModal, setOpenStatisticsModal] = useState(false);
  const { mutateAsync: benchMutate } = useAttendanceBenchMutate();

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

  const onClickExcel = useCallback((_title: string) => {
    console.log("titel", _title);
  }, []);

  const items = [
    {
      key: "personalAttendance",
      label: (
        <GRText onClick={() => onClickExcel("personalAttendance")}>텀</GRText>
      )
    },
    {
      key: "leaderAttendance",
      label: (
        <GRText onClick={() => onClickExcel("leaderAttendance")}>
          순모임별
        </GRText>
      )
    },
    {
      key: "managerAttendance",
      label: (
        <GRText onClick={() => onClickExcel("managerAttendance")}>
          나무별
        </GRText>
      )
    },
    {
      key: "gradeAttendance",
      label: (
        <GRText onClick={() => onClickExcel("gradeAttendance")}>학년</GRText>
      )
    }
  ];

  useEffect(() => {
    (async () => {
      try {
        await benchMutate({
          name: "termAttendanceJob",
          jobParameters: {
            requestDate: dayjs().weekday(0).format(DEFAULT_DATE_FOMAT)
          }
        });
        await benchMutate({
          name: "weeklyAttendanceJob",
          jobParameters: {
            termId: 1
          }
        });
      } catch (e) {
      } finally {
      }
    })();
  }, [benchMutate]);

  return (
    <>
      <HeaderView
        title={"출석 통계"}
        headerComponent={
          <>
            <GRButtonText
              onClick={onClickStatistics}
              buttonType={"primary"}
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
              <Dropdown
                menu={{
                  items
                }}
                placement={"bottom"}
                arrow
              >
                <GRButtonText buttonType={"default"} size={"small"}>
                  <FileExcelOutlined
                    rev={undefined}
                    style={{ fontSize: "1rem", marginRight: "0.3rem" }}
                  />
                </GRButtonText>
              </Dropdown>
            </GRView>
            {/* <ExcelButton onlyIcon size={"small"} onClickExcel={onClickExcel} /> */}
          </>
        }
      />
      <GRContainerView>
        <StatisticsCompareCards />
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
