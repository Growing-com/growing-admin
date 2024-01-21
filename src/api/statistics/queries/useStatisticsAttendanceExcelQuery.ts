import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getStatisticsAttendanceExcel } from "..";

export type tStatisticsAttendanceExcelOption =
  | "personalAttendance"
  | "leaderAttendance" 
  | "managerAttendance"
  | "gradeAttendance"
  | "newFamilyAttendance"
  | undefined;

type tUseStatisticsAttendanceExcelQuery = {
  options?: tStatisticsAttendanceExcelOption;
};

export const useStatisticsAttendanceExcelQuery = ({
  options
}: tUseStatisticsAttendanceExcelQuery) => {
  return useQuery(
    [queryKeys.STATISTICS_ATTENDANCE_EXCEL, options],
    async () => {
      if (options) {
        return await getStatisticsAttendanceExcel({
          termId: 1,
          options
        });
      }
    },
    {
      enabled: !!options,
      select: data => data?.content
    }
  );
};
