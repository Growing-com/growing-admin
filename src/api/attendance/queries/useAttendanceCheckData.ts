import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getAttendanceCheckGroupData, getAttendanceCheckStumpData } from "..";

export const useAttendanceCheckData = (date: string, codyId?: number) => {
  const { data: checkGroupData } = useQuery({
    queryKey: [queryKeys.ATTENDANCE_NORMAL_CHECK, date, codyId],
    queryFn: async () => await getAttendanceCheckGroupData({ date, codyId }),
    enabled: !!date && !!codyId,
    select: _data => _data?.content
  });

  const { data: checkStumpData } = useQuery({
    queryKey: [queryKeys.ATTENDANCE_STUMP_CHECK, date],
    queryFn: async () => await getAttendanceCheckStumpData({ date }),
    enabled: !!date,
    select: _data => _data?.content
  });

  return { checkGroupData, checkStumpData };
};
