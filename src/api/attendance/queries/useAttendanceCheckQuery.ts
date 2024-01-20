import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getAttendance } from "..";
type tUseAttendanceCheckQueryParam = {
  week: string;
  codyId?: number;
};
export const useAttendanceCheckQuery = ({
  week,
  codyId
}: tUseAttendanceCheckQueryParam) => {
  return useQuery(
    [queryKeys.ATTENDANCE_CHECK, week, codyId],
    async () => {
      if (codyId) {
        return await getAttendance({ week, codyId });
      }
    },
    {
      enabled: !!week && !!codyId,
      staleTime: Infinity,
      select: _data => _data?.content
    }
  );
};
