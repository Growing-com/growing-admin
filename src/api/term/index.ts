import { REQUEST_METHOD, request } from "api";
import type { tTermCody, tTermLeader, tTermNewFamily } from "./types";

const TERM_PREFIX = "/term";

export const getTermCody = (termId: number) => {
  return request<tTermCody[]>({
    method: REQUEST_METHOD.GET,
    url: `${TERM_PREFIX}/${termId}/cody`
  });
};

export const getTermMemberByCodyId = (termId: number, codyId: number) => {
  return request<tTermLeader[]>({
    method: REQUEST_METHOD.GET,
    url: `${TERM_PREFIX}/${termId}/cody/${codyId}/members`
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

type tPostNewFamilyLineUpData = {
  teamId: number;
  teamMemberId: number;
  data: {
    /**  @example 11, */
    plantTeamId: number;
    /**  @example "2023-10-13", */
    lineupDate: string;
    /**  @example 9 */
    gradeAtFirstVisit: number;
  };
};

export const postNewFamilyLineUp = ({
  teamId,
  teamMemberId,
  data
}: tPostNewFamilyLineUpData) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `team/${teamId}/teamMember/${teamMemberId}/lineup`,
    data
  });
};

type tPostNewFamilyLineOutData = {
  teamId: number;
  teamMemberId: number;
  data: {
    /**  @example "2023-10-13", */
    lineupDate: string;
    /**  @example 9 */
    gradeAtFirstVisit: number;
  };
};

export const postNewFamilyLineOut = ({
  teamId,
  teamMemberId,
  data
}: tPostNewFamilyLineOutData) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `team/${teamId}/teamMember/${teamMemberId}/lineout`,
    data
  });
};
