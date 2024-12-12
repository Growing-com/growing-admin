import { REQUEST_METHOD, request } from 'api';
import { tAttendanceData, tAttendanceCheckDataParams, tPostGroupUserAttandance } from './type';

const version = "v1";

export const getAttendanceCheckGroupData = (params:tAttendanceCheckDataParams) => {
    return request<tAttendanceData[]>({
        method:REQUEST_METHOD.GET,
        url: `${version}/attendances/normal-attendance`,
        params
    })
}

export const postGroupUserAttandance = (data: tPostGroupUserAttandance) => {
    return request({
        method: REQUEST_METHOD.POST,
        url: `${version}/attendances/group-attendance-check`,
        data
    })
}