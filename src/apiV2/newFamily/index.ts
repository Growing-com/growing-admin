import { REQUEST_METHOD, request } from "api";
import { Nullable } from "common/type-aliases";
import { tLineOutNewFamilyV2, tNewFamilyV2 } from "./type";

const version = "v2";

type getNewFamiliesParmas = {
  newFamilyGroupId?: number;
};

export const getNewFamilies = (params?: getNewFamiliesParmas) => {
  return request<tNewFamilyV2[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/new-families`,
    params
  });
};

export const getLineOutNewFamiles = () => {
  return request<tLineOutNewFamilyV2[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/lined-out-new-families`
  });
};

export const createNewFamily = (data: tNewFamilyV2) => {
  return request<tNewFamilyV2>({
    method: REQUEST_METHOD.POST,
    url: `${version}/new-families/register`,
    data
  });
};

// 등반과 라인업 동시에 하기 위해서 smallGroupId 값 넣어주면 된다.
export type tPromoteNewFamilyParams = {
  promoteDate: string;
  smallGroupId: Nullable<number>;
  newFamilyId: number;
};

export const promteNewFamily = (data: tPromoteNewFamilyParams) => {
  const { newFamilyId, ...restData } = data;
  return request<tNewFamilyV2>({
    method: REQUEST_METHOD.POST,
    url: `${version}/new-families/${data.newFamilyId}/promote`,
    data: restData
  });
};

export const lineOutNewFamily = (newFamilyId: number) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/new-families/${newFamilyId}/line-out`
  });
};

type tLineOutRollBackNewFamily = {
  lineOutNewFamilyId: number;
  data?: {
    newFamilyGroupId?: number;
  };
};

export const lineOutRollBackNewFamily = (params: tLineOutRollBackNewFamily) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/lined-out-new-families/${params.lineOutNewFamilyId}/rollback`,
    data: params.data
  });
};

type tnewFamilyAttendancesParams = {
  startDate: string;
  endDate: string;
};

export const newFamilyAttendances = (params: tnewFamilyAttendancesParams) => {
  return request({
    method: REQUEST_METHOD.GET,
    url: `${version}/new-family-attendances`,
    params
  });
};

// smallGroup 필수 
export type tNewFamiliesLineUpParams = {
  newFamilyId: number;
  smallGroupId: number;
  promoteDate: Nullable<string>;
};

// 새가족 대량 라인업
export const newFamiliesLineUp = (data: tNewFamiliesLineUpParams[]) => {
  const requestBody = {
    requests: data,
  }
  
  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/new-families/batch-line-up`,
    data: requestBody
  });
};
