import { useQuery } from "@tanstack/react-query";
import {
  getStatisticsAttendanceSummary,
  tGetStatisticsAttendanceSummaryParams
} from "..";
import statisticsQueryKeys from "./statisticsQueryKeys";

export const useStatisticsAttendanceSummaryQuery = (
  params: tGetStatisticsAttendanceSummaryParams
) => {
  return useQuery(
    [statisticsQueryKeys.STATISTICS_BASE, params],
    async () => await getStatisticsAttendanceSummary(params),
    {
      enabled: !!params,
      select: _data => {
        return {
          femaleAttendance: _data?.content[0]?.femaleAttendance ?? 0,
          femaleRegistered: _data?.content[0]?.femaleRegistered ?? 0,
          maleAttendance: _data?.content[0]?.maleAttendance ?? 0,
          maleRegistered: _data?.content[0]?.maleRegistered ?? 0,
          newComerAttendance: _data?.content[0]?.newComerAttendance ?? 0,
          newComerRegistered: _data?.content[0]?.newComerRegistered ?? 0,
          newVisited: _data?.content[0]?.newVisited ?? 0,
          totalAbsent: _data?.content[0]?.totalAbsent ?? 0,
          totalAttendance: _data?.content[0]?.totalAttendance ?? 0,
          totalOnline: _data?.content[0]?.totalOnline ?? 0,
          totalRegistered: _data?.content[0]?.totalRegistered ?? 0
        };
      },
      staleTime: Infinity
    }
  );
};
