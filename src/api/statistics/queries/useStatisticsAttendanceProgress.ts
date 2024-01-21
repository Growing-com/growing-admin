import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import {
  getStatisticsAttendanceProgress,
  tGetStatisticsAttendanceProgressParams
} from "..";

export const useStatisticsAttendanceProgressQuery = ({
  termId,
  week 
}: tGetStatisticsAttendanceProgressParams) => {
  return useQuery(
    [queryKeys.STATISTICS_ATTENDANCE_PROGRESS, week],
    async () => await getStatisticsAttendanceProgress({ termId, week }),
    {
      select: data => data?.content
    }
  );
};
