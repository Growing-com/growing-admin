import { REQUEST_METHOD, request } from "api";
import {
  tAttendanceCheckListItem,
  tAttendanceProgress
} from "api/attendance/types";
import { tStatisticsAttendanceExcelOption } from "./queries/useStatisticsAttendanceExcelQuery";

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
    url: `/statistics/attendanceSummary`,
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
  return request<tAttendanceCheckListItem[]>({
    method: REQUEST_METHOD.GET,
    url: `/statistics/attendance`,
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
  return request<tAttendanceCheckListItem[]>({
    method: REQUEST_METHOD.GET,
    url: `/statistics/term/${termId}/${options}`
  });
};

export type tGetStatisticsAttendanceProgressParams = {
  termId: number;
  week: string;
};

export const getStatisticsAttendanceProgress = ({
  termId,
  week
}: tGetStatisticsAttendanceProgressParams) => {
  return request<tAttendanceProgress>({
    method: REQUEST_METHOD.GET,
    url: `/statistics/term/${termId}/attendanceProgress`,
    params: { week }
  });
};
