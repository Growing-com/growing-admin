import { REQUEST_METHOD, request } from "api";

const version = "v1";

type tSmallGroup = {
  smallGroupId: number;
  smallGroupLeaderName: string;
};

export const getSmallGroupLeader = () => {
  return request<tSmallGroup[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/active-small-groups`
  });
};
// export const getSmallGroupLeader = ({ termId }: { termId: number }) => {
//   return request<tSmallGroup[]>({
//     method: REQUEST_METHOD.GET,
//     url: `${version}/term/${termId}/small-groups`
//   });
// };

type tGetNewFamilyGroup = {
  newFamilyGroupId: number;
  newFamilyGroupLeaderName: string;
};

export const getNewFamilyGroup = () => {
  return request<tGetNewFamilyGroup[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/active-new-family-groups`
  });
};
// export const getNewFamilyGroup = ({ termId }: { termId: number }) => {
//   return request<tGetNewFamilyGroup[]>({
//     method: REQUEST_METHOD.GET,
//     url: `${version}/term/${termId}/new-family-groups`
//   });
// };

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