import { useQuery } from "@tanstack/react-query";
import { getStatisticsAttendance, tGetStatisticsAttendanceParams } from "..";
import statisticsQuerykeys from "../statisticsQuerykeys";

export const useStatisticsAttendance = (
  params: tGetStatisticsAttendanceParams,
  option: "isAbsent" | "newFamily"
) => {
  return useQuery(
    [statisticsQuerykeys.STATISTICS_ATTENDANCE, option],
    async () => await getStatisticsAttendance(params),
    {
      select: _data => _data.content
    }
  );
};
