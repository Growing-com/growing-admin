import { REQUEST_METHOD, request } from "api";

const version = "v1";

export type tSmallGroupLeaders = {
  codyName: string;
  smallGroupId: number;
  smallGroupLeaderName: string;
}

type tSmallGroup = {
  codyName: string;
  smallGroupLeaders: tSmallGroupLeaders[];
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
  termId: Number;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export const getTermList = () => {
  return request<tTerm[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/terms`
  })
}

export const getActiveTerm = () => {
  return request<tTerm[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/terms`
  })
}