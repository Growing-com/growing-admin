import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getAttendanceRegisterRate } from "..";

export const useAttendanceRegisterRate = (date?: string) => {
  return useQuery(
    [queryKeys.ATTENDANCE_RANGE_DATA, date],
    async () => await getAttendanceRegisterRate({ date }),
    {
      enabled: !!date,
      select: _data => _data?.content
    }
  );
};
