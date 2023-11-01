import { REQUEST_METHOD, request } from "api";
import { tUser } from "api/account/types";
import {
  tAttendanceCheck,
  tAttendanceCheckItem,
  tAttendanceCheckParam,
  tAttendanceItem,
  tAttendanceSearch
} from "./types";
export const ATTENDANCE_REFIX = "/attendance";

export const getAttendance = (params: tAttendanceCheckParam) => {
  return request<tAttendanceCheckItem[]>({
    method: REQUEST_METHOD.GET,
    url: `${ATTENDANCE_REFIX}`,
    params
  });
};

export type tUseAttendanceQueryResposne = {
  attendanceItems: tAttendanceItem[];
} & tUser;

export const getAttendanceSearch = (params: tAttendanceSearch) => {
  return request<tUseAttendanceQueryResposne[]>({
    method: REQUEST_METHOD.GET,
    url: `${ATTENDANCE_REFIX}/search`,
    params
  });
};

export const postAttendanceCheck = (data: tAttendanceCheck) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `${ATTENDANCE_REFIX}`,
    data
  });
};
