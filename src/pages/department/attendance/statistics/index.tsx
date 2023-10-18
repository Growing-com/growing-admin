import { FileExcelOutlined } from "@ant-design/icons";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRView from "@component/atom/view/GRView";
import HeaderView from "@component/molecule/view/HeaderView";
import { Dropdown } from "antd";
import { useStatisticsAttendance } from "api/statistics/queries/useStatisticsAttendance";
import { useStatisticsAttendanceExcelQuery } from "api/statistics/queries/useStatisticsAttendanceExcelQuery";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";
import StatisticsCompareCards from "./StatisticsCompareCards";
import StatisticsCompareTable from "./StatisticsCompareTable";
import StatisticsModal from "./StatisticsModal";

export type tStatisticsAttendanceExcelOption =
  | "personalAttendance"
  | "leaderAttendance"
  | "managerAttendance"
  | "gradeAttendance"
  | "absentAttendance"
  | "newFamilyAttendance"
  | undefined;

const LAST_SUNDAY = 0;
const THIS_SUNDAY = 7;

const AttendanceStatistics = () => {
  const [openStatisticsModal, setOpenStatisticsModal] = useState(false);
  const [excelOption, setExcelOption] =
    useState<tStatisticsAttendanceExcelOption>();

  // const { mutateAsync: benchMutate } = useAttendanceBenchMutate();
  const { data: excelData } = useStatisticsAttendanceExcelQuery({
    options: excelOption
  });

  const { data: statisticsAbsentData } = useStatisticsAttendance(
    {
      startDate: dayjs().weekday(LAST_SUNDAY).format(DEFAULT_DATE_FOMAT),
      endDate: dayjs().weekday(THIS_SUNDAY).format(DEFAULT_DATE_FOMAT),
      isAbsent: true
    },
    "isAbsent"
  );

  const { data: statisticsNewData } = useStatisticsAttendance(
    {
      startDate: dayjs().weekday(LAST_SUNDAY).format(DEFAULT_DATE_FOMAT),
      endDate: dayjs().weekday(THIS_SUNDAY).format(DEFAULT_DATE_FOMAT),
      isNewOnly: true
    },
    "newFamily"
  );

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

  const onClickExcel = useCallback(
    (_downloadExcelOption?: tStatisticsAttendanceExcelOption) => {
      if (_downloadExcelOption) {
        setExcelOption(_downloadExcelOption);
      }
    },
    []
  );

  useEffect(() => {
    if (excelData) {
      console.log("excelData", excelData);
    }
  }, [excelData]);

  const items = [
    {
      key: "term",
      label: "텀",
      children: [
        {
          key: "personalAttendance",
          label: "출결",
          onClick: () => onClickExcel("personalAttendance")
        },
        {
          key: "leaderAttendance",
          label: "순모임별",
          onClick: () => onClickExcel("leaderAttendance")
        },
        {
          key: "managerAttendance",
          label: "나무별",
          onClick: () => onClickExcel("managerAttendance")
        },
        {
          key: "gradeAttendance",
          label: "학년",
          onClick: () => onClickExcel("gradeAttendance")
        }
      ]
    },
    {
      key: "week",
      label: "지난주",
      children: [
        {
          key: "absentAttendance",
          label: "결석 인원",
          onClick: () => onClickExcel("absentAttendance")
        },
        {
          key: "newFamilyAttendance",
          label: "새가족 인원",
          onClick: () => onClickExcel("newFamilyAttendance")
        }
      ]
    }
  ];

  return (
    <>
      <HeaderView
        title={"출석 통계"}
        headerComponent={
          <>
            {/* <GRButtonText
              onClick={() => {
                console.log("Empty");
              }}
              buttonType={"primary"}
              size={"large"}
              marginright={GRStylesConfig.BASE_MARGIN}
            >
              <BarChartOutlined
                rev={undefined}
                style={{ fontSize: "1rem", marginRight: "0.5rem" }}
              />
              그룹별 통계
            </GRButtonText> */}
            <GRView>
              <Dropdown
                menu={{
                  items
                }}
                placement={"bottom"}
                arrow
              >
                <GRButtonText buttonType={"default"} size={"large"}>
                  <FileExcelOutlined
                    rev={undefined}
                    style={{ fontSize: "1rem", marginRight: "0.3rem" }}
                  />
                  엑셀 다운
                </GRButtonText>
              </Dropdown>
            </GRView>
          </>
        }
      />
      <GRContainerView>
        <StatisticsCompareCards />
        <StatisticsCompareTable
          headerTitle={"🐏 결석 인원"}
          data={statisticsAbsentData}
        />
        <StatisticsCompareTable
          headerTitle={"🌱 새가족 인원"}
          data={statisticsNewData}
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
