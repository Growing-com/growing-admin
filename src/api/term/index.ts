import { REQUEST_METHOD, request } from "api";
import type { tTermCody, tTermNewFamily } from "./types";

const TERM_PREFIX = "/term";

export const getTermCody = (termId: number) => {
  return request<tTermCody[]>({
    method: REQUEST_METHOD.GET,
    url: `${TERM_PREFIX}/${termId}/cody`
  });
};

export const getTermMemberByCodyId = (termId: number, codyId: number) => {
  return request<tTermCody[]>({
    method: REQUEST_METHOD.GET,
    url: `${TERM_PREFIX}/${termId}/cody/${codyId}/members`
  });
};

export const getTermLeaderByCodyId = (termId: number, codyId: number) => {
  return request<tTermCody[]>({
    method: REQUEST_METHOD.GET,
    url: `${TERM_PREFIX}/${termId}/cody/${codyId}/leaders`
  });
};

export const getTermNewFamily = (termId: number) => {
  return request<tTermNewFamily[]>({
    method: REQUEST_METHOD.GET,
    url: `${TERM_PREFIX}/${termId}/newComers`
  });
};

export const getTermNewFamilyLeader = (termId: number) => {
  return request<tTermNewFamily[]>({
    method: REQUEST_METHOD.GET,
    url: `${TERM_PREFIX}/${termId}/newTeamLeaders`
  });
};

export const getTermStatistics = (startDate: string, endDate: string) => {
  return request({
    method: REQUEST_METHOD.GET,
    url: `statistics/attendanceSummary`,
    params: {
      startDate,
      endDate
    }
  });
};
