import { FileExcelOutlined } from "@ant-design/icons";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRContainerView from "@component/atom/view/GRContainerView";
import HeaderView from "@component/molecule/view/HeaderView";
import { useStatisticsAttendance } from "api/statistics/queries/useStatisticsAttendance";
import { useCallback, useState } from "react";
import { getWeekDataFromToday } from "utils/DateUtils";
import StatisticsCompareCards from "./StatisticsCompareCards";
import StatisticsCompareTable from "./StatisticsCompareTable";
import StatisticsExcelModal from "./StatisticsExcelModal";
import StatisticsModal from "./StatisticsModal";

const AttendanceStatistics = () => {
  const [openStatisticsModal, setOpenStatisticsModal] = useState(false);
  const [openStatisticsExcelModal, setOpenStatisticsExcelModal] =
    useState(false);

  // const isCheckWednesday = useMemo(
  //   () => dayjs().diff(dayjs().weekday(4), "date") === 0,
  //   []
  // );

  // console.log("isCheckWednesday", isCheckWednesday);
  const { data: statisticsAbsentData } = useStatisticsAttendance(
    {
      startDate: getWeekDataFromToday.lastlastSunday,
      endDate: getWeekDataFromToday.thisSaturday,
      isAbsent: true
    },
    "isAbsent"
  );

  const { data: statisticsNewData } = useStatisticsAttendance(
    {
      startDate: getWeekDataFromToday.lastlastSunday,
      endDate: getWeekDataFromToday.thisSaturday,
      isNewOnly: true
    },
    "newFamily"
  );

  const onClickStatistics = useCallback(() => {
    setOpenStatisticsModal(!openStatisticsModal);
  }, [openStatisticsModal]);

  const onClickStatisticsExcel = useCallback(() => {
    setOpenStatisticsExcelModal(!openStatisticsExcelModal);
  }, [openStatisticsExcelModal]);

  return (
    <>
      <HeaderView
        title={"출석 통계"}
        headerComponent={
          <GRButtonText
            buttonType={"default"}
            size={"large"}
            onClick={onClickStatisticsExcel}
          >
            <FileExcelOutlined
              rev={undefined}
              style={{ fontSize: "1rem", marginRight: "0.3rem" }}
            />
            엑셀 다운
          </GRButtonText>
        }
      />
      <GRContainerView>
        <StatisticsCompareCards />
        <StatisticsCompareTable
          headerTitle={"🐏 결석 인원"}
          dataSource={statisticsAbsentData}
        />
        <StatisticsCompareTable
          headerTitle={"🌱 새가족반 출결"}
          dataSource={statisticsNewData}
        />
      </GRContainerView>
      <StatisticsModal
        onClickStatistics={onClickStatistics}
        open={openStatisticsModal}
      />
      <StatisticsExcelModal
        open={openStatisticsExcelModal}
        onClickStatisticsExcel={onClickStatisticsExcel}
      />
    </>
  );
};

export default AttendanceStatistics;
