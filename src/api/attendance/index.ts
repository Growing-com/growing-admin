import { REQUEST_METHOD, request } from "api";
import {
  tAttendanceCheckData,
  tAttendanceCheckDataParams,
  tPostGroupUserAttendance,
  tAttendanceRangeData,
  tAttendanceData,
  tPostStumpAttendance,
  tStumpAttendanceCheckData,
  tAttendanceRegisterRate
} from "./type";

const version = "v1";

export const getAttendanceCheckGroupData = (
  params: tAttendanceCheckDataParams
) => {
  return request<tAttendanceCheckData[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/attendances/normal-attendance`,
    params
  });
};

export const getAttendanceCheckStumpData = (
  params: tAttendanceCheckDataParams
) => {
  // return request<tAttendanceCheckData[]>({
  return request<tStumpAttendanceCheckData[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/attendances/stump-attendance`,
    params
  });
};

export const postStumpAttandance = (data: tPostStumpAttendance) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/attendances/stump-attendance-check`,
    data
  });
};

export const postGroupUserAttandance = (data: tPostGroupUserAttendance) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/attendances/group-attendance-check`,
    data
  });
};

export const getAttendanceData = (params?: tAttendanceRangeData) => {
  return request<tAttendanceData[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/attendances/search`,
    params
  });
};

export const getAttendanceRegisterRate = (params?: { date?: string }) => {
  return request<tAttendanceRegisterRate>({
    method: REQUEST_METHOD.GET,
    url: `${version}/attendances/attendance-register-rate`,
    params
  });
};
