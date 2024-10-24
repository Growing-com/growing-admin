import { REQUEST_METHOD, request } from "api";
import { tDutyCount, tUser } from "api/account/types";
import {
  tSmallGroup,
  tGetNewFamilyGroup,
  tTerm,
  tCody,
  tLeader,
  tGroup,
} from "./type";

const version = "v1";

export const getCodyAndSmallGroups = ({ termId }: { termId: number }) => {
  return request<tSmallGroup[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/terms/${termId}/small-groups`
  });
};

export const getNewFamilyGroup = ({ termId }: { termId: number }) => {
  return request<tGetNewFamilyGroup[]>({
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

export const getAllLeaders = ({ termId }: { termId: number }) => {
  return request<tLeader[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/terms/${termId}/all-leaders`
  });
};

export const getTermCody = ({ termId }: { termId: number }) => {
  return request<tCody[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/terms/${termId}/codies`
  });
};

export const getLeaderByCody = ({ codyId }: { codyId: number }) => {
  return request<tGroup[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/codies/${codyId}/groups`
  });
};

export const getMembersByCody = ({
  codyId,
  smallGroupId
}: {
  codyId: number;
  smallGroupId?: number;
}) => {
  return request<tUser[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/codies/${codyId}/members`,
    params: { smallGroupId }
  });
};

export const getDutyCount = ({termId}:{termId:number})=>{
  return request<tDutyCount>({
    method: REQUEST_METHOD.GET,
    url: `${version}/terms/${termId}/duty-distribution-count`,
  })
}