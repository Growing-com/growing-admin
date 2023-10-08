import { REQUEST_METHOD, request } from "api";
import { tStatisticsAttendanceExcelOption } from "pages/department/attendance/statistics";

const STATISTICS_PREFIX = "/statistics";

export type tGetStatisticsAttendanceSummaryParams = {
  startDate: string;
  endDate: string;
};

export const getStatisticsAttendanceSummary = (
  params: tGetStatisticsAttendanceSummaryParams
) => {
  return request({
    method: REQUEST_METHOD.GET,
    url: `${STATISTICS_PREFIX}/attendanceSummary`,
    params
  });
};

export type tGetStatisticsAttendanceParams = {
  startDate: string;
  endDate: string;
  isAbsent?: boolean;
  isNewOnly?: boolean;
};

export const getStatisticsAttendance = (
  params: tGetStatisticsAttendanceParams
) => {
  return request({
    method: REQUEST_METHOD.GET,
    url: `${STATISTICS_PREFIX}/attendance`,
    params
  });
};

type tPostStatisticsAttendanceJob = {
  name: "weeklyAttendanceJob" | "termAttendanceJob";
  jobParameters: {
    /** "2023-07-30" */
    requestDate?: string;
    termId?: number;
  };
};

export const postStatisticsAttendanceJob = (
  data: tPostStatisticsAttendanceJob
) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `/job`,
    data
  });
};

export type tGetStatisticsAttendanceExcelParams = {
  termId: number;
  options: tStatisticsAttendanceExcelOption;
};

export const getStatisticsAttendanceExcel = ({
  termId,
  options
}: tGetStatisticsAttendanceExcelParams) => {
  return request({
    method: REQUEST_METHOD.GET,
    url: `${STATISTICS_PREFIX}/term/${termId}/${options}`
  });
};
