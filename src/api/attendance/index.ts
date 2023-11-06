import { REQUEST_METHOD, request } from "api";
import { tUser } from "api/account/types";
import {
  tAttendanceCheck,
  tAttendanceCheckItem,
  tAttendanceCheckParam,
  tAttendanceItem,
  tAttendanceSearch
} from "./types";

export const getAttendance = (params: tAttendanceCheckParam) => {
  return request<tAttendanceCheckItem[]>({
    method: REQUEST_METHOD.GET,
    url: `/attendance`,
    params
  });
};

export type tUseAttendanceQueryResposne = {
  attendanceItems: tAttendanceItem[];
} & tUser;

export const getAttendanceSearch = (params: tAttendanceSearch) => {
  return request<tUseAttendanceQueryResposne[]>({
    method: REQUEST_METHOD.GET,
    url: `/attendance/search`,
    params
  });
};

export const postAttendanceCheck = (data: tAttendanceCheck) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `/attendance`,
    data
  });
};
