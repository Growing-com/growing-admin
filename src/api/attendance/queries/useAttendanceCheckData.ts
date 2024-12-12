import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getAttendanceCheckGroupData } from "..";

export const useAttendanceCheckData = (date: string, codyId?: number) => {
  return useQuery(
    [queryKeys.ATTENDANCE_NORMAL_CHECK, date, codyId],
    async () => await getAttendanceCheckGroupData({ date, codyId }),
    {
      enabled: !!date && !!codyId,
      select: _data => _data?.content
    }
  );
};
