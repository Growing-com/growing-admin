import { REQUEST_METHOD, request } from "api";

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
