import { REQUEST_METHOD, request } from "api";
import { tAccount, tSex } from "api/account/types";

const version = "v1";

export type tSmallGroupLeader = {
  codyName: string;
  smallGroupId: number;
  smallGroupLeaderName: string;
};

type tSmallGroup = {
  codyName: string;
  smallGroupLeaders: tSmallGroupLeader[];
};

export const getSmallGroupLeader = ({ termId }: { termId: number }) => {
  return request<tSmallGroup[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/terms/${termId}/small-groups`
  });
};

type tGetNewFamilyGroup = {
  newFamilyGroupId: number;
  newFamilyGroupLeaderName: string;
};

export const getNewFamilyGroup = ({ termId }: { termId: number }) => {
  return request<tGetNewFamilyGroup[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/terms/${termId}/new-family-groups`
  });
};

type tTerm = {
  termId: number;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
};

export const getTermList = () => {
  return request<tTerm[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/terms`
  });
};

export const getActiveTerm = () => {
  return request<tTerm[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/terms/active-term`
  });
};

export type tLeader = tAccount & {
  /** @description 코디 이름  @example  "장준혁" */
  codyName?: string;
  /** @description 직분 이름  @example  "CODY" */
  duty?: string;
};

export const getAllLeaders = ({ termId }: { termId: number }) => {
  return request<tLeader[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/terms/${termId}/all-leaders`
  });
};
