import { useQuery } from "@tanstack/react-query";
import { tStatisticsAttendanceExcelOption } from "pages/department/attendance/statistics";
import { getStatisticsAttendanceExcel } from "..";
import statisticsQueryKeys from "./statisticsQueryKeys";

export const useStatisticsAttendanceExcelQuery = (
  options?: tStatisticsAttendanceExcelOption
) => {
  return useQuery(
    [statisticsQueryKeys.STATISTICS_ATTENDANCE_EXCEL],
    async () => {
      if (options) {
        await getStatisticsAttendanceExcel({
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
