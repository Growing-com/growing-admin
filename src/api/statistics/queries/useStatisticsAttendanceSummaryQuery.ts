import { useQuery } from "@tanstack/react-query";
import {
  getStatisticsAttendanceSummary,
  tGetStatisticsAttendanceSummaryParams
} from "..";
import statisticsQueryKeys from "../statisticsQueryKeys";

export const useStatisticsAttendanceSummaryQuery = (
  params: tGetStatisticsAttendanceSummaryParams
) => {
  return useQuery(
    [statisticsQueryKeys.STATISTICS_BASE],
    async () => await getStatisticsAttendanceSummary(params),
    {
      select: _data => _data.content,
      staleTime: Infinity
    }
  );
};
