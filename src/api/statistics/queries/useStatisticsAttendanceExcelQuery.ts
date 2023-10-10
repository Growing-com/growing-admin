import { useQuery } from "@tanstack/react-query";
import { tStatisticsAttendanceExcelOption } from "pages/department/attendance/statistics";
import { getStatisticsAttendanceExcel } from "..";
import statisticsQueryKeys from "./statisticsQueryKeys";

type tUseStatisticsAttendanceExcelQuery = {
  options?: tStatisticsAttendanceExcelOption;
};

export const useStatisticsAttendanceExcelQuery = ({
  options
}: tUseStatisticsAttendanceExcelQuery) => {
  return useQuery(
    [statisticsQueryKeys.STATISTICS_ATTENDANCE_EXCEL, options],
    async () => {
      if (options) {
        return await getStatisticsAttendanceExcel({
          termId: 1,
          options
        });
      }
    },
    {
      enabled: !!options
    }
  );
};
