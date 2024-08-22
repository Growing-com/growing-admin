import { REQUEST_METHOD, request } from "api";

const version = "v2";

type tSmallGroup = {
  smallGroupId: number;
  smallGroupLeaderName: string;
};

export const getSmallGroupLeader = ({ termId }: { termId: number }) => {
  return request<tSmallGroup[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/term/${termId}/small-groups`
  });
};

type tGetNewFamilies = {
  newFamilyGroupId: number;
  newFamilyGroupLeaderName: string;
};

export const getNewFamilies = ({ termId }: { termId: number }) => {
  return request<tGetNewFamilies[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/term/${termId}/new-family-groups`
  });
};
