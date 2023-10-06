import { useQuery } from "@tanstack/react-query";
import { getAttendanceSearch } from "..";
import attendanceQueryKeys from "../attendanceQuerykeys";
import { tAttendanceSearch } from "../types";

// GET http://localhost:8080/api/attendance?startDate=2023-07-01&endDate=2023-07-29&grade=10&baseName=강
export const useAttendanceQuery = (params: tAttendanceSearch) => {
  return useQuery(
    [attendanceQueryKeys.ATTENDACNE],
    async () => await getAttendanceSearch(params),
    {
      enabled: !!params,
      select: _data => _data.content
    }
  );
};
