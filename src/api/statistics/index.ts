import { REQUEST_METHOD, request } from "api";
import { tSex } from "api/account/types";
import { tAttendanceItem } from "api/attendance/types";
import { tStatisticsAttendanceExcelOption } from "pages/department/attendance/statistics";

const STATISTICS_PREFIX = "/statistics";

export type tGetStatisticsAttendanceSummaryParams = {
  startDate: string;
  endDate: string;
};

type tGetStatisticsAttendanceSummaryResponse = {
  femaleAttendance: number;
  femaleRegistered: number;
  maleAttendance: number;
  maleRegistered: number;
  newComerAttendance: number;
  newComerRegistered: number;
  newVisited: number;
  totalAbsent: number;
  totalAttendance: number;
  totalOnline: number;
  totalRegistered: number;
};

export const getStatisticsAttendanceSummary = (
  params: tGetStatisticsAttendanceSummaryParams
) => {
  return request<tGetStatisticsAttendanceSummaryResponse[]>({
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

export type tGetStatisticsAttendanceExcelResponse = {
  //** 7, */
  managerId: number;
  //** "유지현", */
  managerName: string;
  //** "강성혁", */
  leaderName: string;
  //** "한예찬", */
  userName: string;
  //** "MALE", */
  sex: tSex;
  //** 2, */
  grade: number;
  //** "010-2832-6075", */
  phoneNumber: string;
  attendanceItems: tAttendanceItem[];
};

export const getStatisticsAttendanceExcel = ({
  termId,
  options
}: tGetStatisticsAttendanceExcelParams) => {
  return request<tGetStatisticsAttendanceExcelResponse[]>({
    method: REQUEST_METHOD.GET,
    url: `${STATISTICS_PREFIX}/term/${termId}/${options}`
  });
};
