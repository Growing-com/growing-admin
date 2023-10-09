import { useQuery } from "@tanstack/react-query";
import { getAttendanceSearch } from "..";
import { tAttendanceSearch } from "../types";
import attendanceQuerykeys from "./attendanceQuerykeys";

export const useAttendanceQuery = (params?: tAttendanceSearch) => {
  return useQuery(
    [attendanceQuerykeys.ATTENDACNE, params],
    async () => {
      if (params) {
        return await getAttendanceSearch({
          ...params,
          page: (params?.page ?? 0) - 1
        });
      }
    },
    {
      select: _data => {
        return {
          content: _data?.content,
          totalPages: _data?.totalPages,
          size: _data?.size
        };
      }
    }
  );
};
