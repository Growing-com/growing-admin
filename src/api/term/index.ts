import { REQUEST_METHOD, request } from "api";
import { tDutyCount, tUser } from "api/account/types";
import {
  tCodyAndSmallGroup,
  tNewFamilyGroup,
  tTerm,
  tCody,
  tLeader,
  tGroup,
  tPastor
} from "./type";

const version = "v1";

export const getCodyAndSmallGroups = (termId?: number) => {
  return request<tCodyAndSmallGroup[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/terms/${termId}/small-groups`
  });
};

export const getNewFamilyGroup = (termId?: number) => {
  return request<tNewFamilyGroup[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/terms/${termId}/new-family-groups`
  });
};

export const getTermList = () => {
  return request<tTerm[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/terms`
  });
};

export const getActiveTerm = () => {
  return request<tTerm>({
    method: REQUEST_METHOD.GET,
    url: `${version}/terms/active-term`
  });
};

export const getAllLeaders = (termId?: number) => {
  return request<tLeader[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/terms/${termId}/all-leaders`
  });
};

export const getTermPastor = (termId?: number) => {
  return request<tPastor[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/terms/${termId}/pastors`
  });
};

export const getTermCody = (termId?: number) => {
  return request<tCody[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/terms/${termId}/codies`
  });
};

export const getLeaderByCody = (codyId?: number) => {
  return request<tGroup[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/codies/${codyId}/groups`
  });
};

export const getMembersByCody = (codyId?: number, smallGroupId?: number) => {
  return request<tUser[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/codies/${codyId}/members`,
    params: { smallGroupId }
  });
};

export const getDutyCount = (termId?: number) => {
  return request<tDutyCount>({
    method: REQUEST_METHOD.GET,
    url: `${version}/terms/${termId}/duty-distribution-count`
  });
};
