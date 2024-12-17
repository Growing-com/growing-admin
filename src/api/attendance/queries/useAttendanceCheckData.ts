import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getAttendanceCheckGroupData, getAttendanceCheckStumpData } from "..";

export const useAttendanceCheckData = (date: string, codyId?: number) => {
  const { data: checkGroupData } = useQuery(
    [queryKeys.ATTENDANCE_NORMAL_CHECK, date, codyId],
    async () => await getAttendanceCheckGroupData({ date, codyId }),
    {
      enabled: !!date && !!codyId,
      select: _data => _data?.content
    }
  );

  const { data: checkStumpData } = useQuery(
    [queryKeys.ATTENDANCE_STUMP_CHECK, date],
    async () => await getAttendanceCheckStumpData({ date }),
    {
      enabled: !!date,
      select: _data => _data?.content
    }
  );

  return { checkGroupData, checkStumpData };
};
