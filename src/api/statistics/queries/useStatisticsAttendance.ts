import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { sortBy } from "lodash";
import { getStatisticsAttendance, tGetStatisticsAttendanceParams } from "..";

export const useStatisticsAttendance = (
  params: tGetStatisticsAttendanceParams,
  option: "isAbsent" | "newFamily"
) => {
  return useQuery(
    [queryKeys.STATISTICS_ATTENDANCE, option],
    async () => await getStatisticsAttendance(params),
    {
      select: _data => {
        return sortBy(_data.content, [o => o.managerName]);
      }
    }
  );
};
