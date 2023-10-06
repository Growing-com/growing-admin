import { useQuery } from "@tanstack/react-query";
import {
  getStatisticsAttendanceSummary,
  tGetStatisticsAttendanceSummaryParams
} from "..";
import statisticsQuerykeys from "../statisticsQuerykeys";

export const useStatisticsAttendanceSummaryQuery = (
  params: tGetStatisticsAttendanceSummaryParams
) => {
  return useQuery(
    [statisticsQuerykeys.STATISTICS_BASE],
    async () => await getStatisticsAttendanceSummary(params),
    {
      select: _data => _data.content,
      staleTime: Infinity
    }
  );
};
