import { FileExcelOutlined } from "@ant-design/icons";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRContainerView from "@component/atom/view/GRContainerView";
import HeaderView from "@component/molecule/view/HeaderView";
import { useStatisticsAttendance } from "api/statistics/queries/useStatisticsAttendance";
import { useCallback, useState } from "react";
import { getWeekDataFromToday } from "utils/DateUtils";
import StatisticsCompareSummaryCards from "./StatisticsCompareSummaryCards";
import StatisticsCompareTable from "./StatisticsCompareTable";
import StatisticsExcelModal from "./StatisticsExcelModal";
import StatisticsModal from "./StatisticsModal";

const AttendanceStatistics = () => {
  const [openStatisticsModal, setOpenStatisticsModal] = useState(false);
  const [openStatisticsExcelModal, setOpenStatisticsExcelModal] =
    useState(false);

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
        <StatisticsCompareSummaryCards />
        <StatisticsCompareTable
          headerTitle={"🐏 결석 인원"}
          dataSource={statisticsAbsentData}
          isUseTab={true}
          infoMessage={"2주 안에 한번이라도 결석한 인원과 나무만 표시합니다"}
        />
        <StatisticsCompareTable
          headerTitle={"🌱 새가족반 결석 인원"}
          dataSource={statisticsNewData}
          isUseTab={true}
          infoMessage={"2주 안에 한번이라도 결석한 인원과 나무만 표시합니다"}
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
