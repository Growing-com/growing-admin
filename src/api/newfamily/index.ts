import { REQUEST_METHOD, request } from "api";
import { tLineOutNewFamily, tNewfamily } from "./type";

const version = "v1";

export const createNewfamily = (data: tNewfamily) => {
  return request<tNewfamily>({
    method: REQUEST_METHOD.POST,
    url: `${version}/new-families/register`,
    data
  });
};

export const updateNewfamily = (data: tNewfamily) => {
  const _newFamilyId = data.newFamilyId;
  return request<tNewfamily>({
    method: REQUEST_METHOD.POST,
    url: `${version}/new-families/${_newFamilyId}/update`,
    data
  });
};

export const getNewfamily = (_newFamilyId: number) => {
  return request<tNewfamily>({
    method: REQUEST_METHOD.GET,
    url: `${version}/new-families/${_newFamilyId}`
  });
};

export const getNewfamilies = () => {
  return request<tNewfamily[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/new-families`
  });
};

export const getLineUpRequestNewfamilies = () => {
  return request<tNewfamily[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/promote-candidate-new-families`
  });
};

export const getLineOutNewfamilies = () => {
  return request<tLineOutNewFamily[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/line-out-new-families`
  });
};

type tPostNewfamilyIds = {
  newFamilyIds: number[]
}

export const requestLineUpNewfamily = (data: tPostNewfamilyIds) => {
  return request<tPostNewfamilyIds>({
    method: REQUEST_METHOD.POST,
    url: `${version}/new-families/request-line-up`,
    data
  });
};

export const lineOutNewfamily = (data: tPostNewfamilyIds) => {
  return request<tPostNewfamilyIds>({
    method: REQUEST_METHOD.POST,
    url: `${version}/new-families/line-out`,
    data
  });
}

export type tPromoteNewfamily = {
  newFamilyId: number;
  promoteDate: string
}

export const promoteNewfamily = (data: tPromoteNewfamily[]) => {
  return request<tPromoteNewfamily[]>({
    method: REQUEST_METHOD.POST,
    url: `${version}/new-families/promote`,
    data
  });
}

export const lineInNewfamily = (lineOutNewFamilyId: number) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/line-out-new-families/${lineOutNewFamilyId}/line-in`,
  });

}
