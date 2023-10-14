import { useQuery } from "@tanstack/react-query";
import { getAttendance } from "..";
import attendanceQuerykeys from "./attendanceQuerykeys";
type tUseAttendanceCheckQueryParam = {
  week: string;
  codyId?: number;
};
export const useAttendanceCheckQuery = ({
  week,
  codyId
}: tUseAttendanceCheckQueryParam) => {
  return useQuery(
    [attendanceQuerykeys.ATTENDANCE_CHECK, week, codyId],
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
