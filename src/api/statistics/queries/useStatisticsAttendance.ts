import { useQuery } from "@tanstack/react-query";
import { getStatisticsAttendance, tGetStatisticsAttendanceParams } from "..";
import statisticsQueryKeys from "./statisticsQueryKeys";

export const useStatisticsAttendance = (
  params: tGetStatisticsAttendanceParams,
  option: "isAbsent" | "newFamily"
) => {
  return useQuery(
    [statisticsQueryKeys.STATISTICS_ATTENDANCE, option],
    async () => await getStatisticsAttendance(params),
    {
      select: _data => _data.content
    }
  );
};
