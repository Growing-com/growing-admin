import GRContainerView from "@component/atom/view/GRContainerView";
import HeaderView from "@component/molecule/view/HeaderView";
import { useStatisticsAttendance } from "api/statistics/queries/useStatisticsAttendance";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";
import StatisticsCompareCards from "./StatisticsCompareCards";
import StatisticsCompareTable from "./StatisticsCompareTable";
import StatisticsExcelPopover from "./StatisticsExcelPopover";
import StatisticsModal from "./StatisticsModal";

const LAST_SUNDAY = 0;
const THIS_SUNDAY = -7;

const AttendanceStatistics = () => {
  const [openStatisticsModal, setOpenStatisticsModal] = useState(false);

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

  return (
    <>
      <HeaderView
        title={"출석 통계"}
        headerComponent={
          <StatisticsExcelPopover
            newFamilyAttendanceData={statisticsNewData}
            absentAttendanceData={statisticsAbsentData}
          />
        }
      />
      <GRContainerView>
        <StatisticsCompareCards />
        <StatisticsCompareTable
          headerTitle={"🐏 결석 인원"}
          dataSource={statisticsAbsentData}
        />
        <StatisticsCompareTable
          headerTitle={"🌱 새가족 인원"}
          dataSource={statisticsNewData}
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
