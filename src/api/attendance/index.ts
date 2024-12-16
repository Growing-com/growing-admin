import { REQUEST_METHOD, request } from "api";
import {
  tAttendanceCheckData,
  tAttendanceCheckDataParams,
  tPostGroupUserAttandance,
  tAttendanceRangeData,
  tAttendanceData
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

export const postGroupUserAttandance = (data: tPostGroupUserAttandance) => {
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
