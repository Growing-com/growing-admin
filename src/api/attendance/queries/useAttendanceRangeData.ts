import { useQuery } from "@tanstack/react-query";
import { tAttendanceRangeData } from "../type";
import queryKeys from "api/queryKeys";
import { getAttendanceData } from "..";

export const useAttendanceRangeData = (params?: tAttendanceRangeData) => {
  return useQuery({
    queryKey: [queryKeys.ATTENDANCE_RANGE_DATA, params],
    queryFn: async () => await getAttendanceData(params),
    enabled: !!params,
    select: _data => _data?.content
  });
};
