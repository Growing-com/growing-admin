import { REQUEST_METHOD, request } from "api";
import type { tTermCody, tTermLeader, tTermNewFamily } from "./types";

export const getTermInfo = () => {
  return request<tTermCody[]>({
    method: REQUEST_METHOD.GET,
    url: `/term`
  });
};

type getTermUserStatisticsResponse = {
  /** 새등록 인원 */
  totalNewRegistered: number;
  /** 전체 인원 */
  totalRegistered: number;
};

export const getTermUserStatistics = (week: string) => {
  return request<getTermUserStatisticsResponse>({
    method: REQUEST_METHOD.GET,
    url: `/term/totalUser`,
    params: {
      week
    }
  });
};

export const getTermCody = (termId: number) => {
  return request<tTermCody[]>({
    method: REQUEST_METHOD.GET,
    url: `/term/${termId}/cody`
  });
};

export const getTermMemberByCodyId = (termId: number, codyId: number) => {
  return request<tTermLeader[]>({
    method: REQUEST_METHOD.GET,
    url: `/term/${termId}/cody/${codyId}/leaders`
  });
};

export const getTermNewFamily = (termId: number) => {
  return request<tTermNewFamily[]>({
    method: REQUEST_METHOD.GET,
    url: `/term/${termId}/newComers`
  });
};

export const getTermNewFamilyLeader = (termId: number) => {
  return request<tTermLeader[]>({
    method: REQUEST_METHOD.GET,
    url: `/term/${termId}/newTeamLeaders`
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
    lineoutDate: string;
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
