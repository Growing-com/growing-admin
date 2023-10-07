import { useQuery } from "@tanstack/react-query";
import { getAttendanceSearch } from "..";
import { tAttendanceSearch } from "../types";
import attendanceQuerykeys from "./attendanceQuerykeys";

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
