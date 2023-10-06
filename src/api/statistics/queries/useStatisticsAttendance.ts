import { useQuery } from "@tanstack/react-query";
import { getStatisticsAttendance, tGetStatisticsAttendanceParams } from "..";
import termQueryKeys from "../../term/termQuerykeys";

export const useStatisticsAttendance = (
  params: tGetStatisticsAttendanceParams,
  option: "isAbsent" | "newFamily"
) => {
  return useQuery(
    [termQueryKeys.TERM_STATISTICS, option],
    async () => await getStatisticsAttendance(params),
    {
      select: _data => _data.content
    }
  );
};
