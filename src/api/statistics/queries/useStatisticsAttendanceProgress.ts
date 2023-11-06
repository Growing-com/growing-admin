import { useQuery } from "@tanstack/react-query";
import {
  getStatisticsAttendanceProgress,
  tGetStatisticsAttendanceProgressParams
} from "..";
import statisticsQueryKeys from "./statisticsQueryKeys";

export const useStatisticsAttendanceProgressQuery = ({
  termId,
  week
}: tGetStatisticsAttendanceProgressParams) => {
  return useQuery(
    [statisticsQueryKeys.STATISTICS_ATTENDANCE_PROGRESS],
    async () => await getStatisticsAttendanceProgress({ termId, week }),
    {
      select: data => data?.content
    }
  );
};
