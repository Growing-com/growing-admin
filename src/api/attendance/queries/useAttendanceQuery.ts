import { useQuery } from "@tanstack/react-query";
import { getAttendanceSearch } from "..";
import attendanceQuerykeys from "../attendanceQuerykeys";
import { tAttendanceSearch } from "../types";

export const useAttendanceQuery = (params?: tAttendanceSearch) => {
  return useQuery(
    [attendanceQuerykeys.ATTENDACNE],
    async () => {
      if (params) {
        return await getAttendanceSearch(params);
      }
    },
    {
      enabled: !!params,
      select: _data => _data?.content
    }
  );
};
