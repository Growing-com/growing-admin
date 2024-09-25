import { REQUEST_METHOD, request } from "api";
import { tLineOutNewFamily, tNewfamily, tNewfamilyAttendances } from "./type";

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
  // return request<tNewfamily>({
  return request<tNewfamily[]>({
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

export const getNewfamiliesAttendances = () => {
  return request<tNewfamilyAttendances[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/new-families/attendances`
  });
}

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

type tLineUpNewfamily = {
  newFamilyId: number;
  smallGroupId:number;
}

export const lineUpNewfamily = (data:tLineUpNewfamily[]) => {
  const requestBody = {
    content: data
  };

  return request<tLineUpNewfamily[]>({
    method: REQUEST_METHOD.POST,
    url: `${version}/new-families/line-up`,
    data: requestBody
  });
}

type tPromoteNewfamily = {
  newFamilyId: number;
  promoteDate: string
}

export const promoteNewfamily = (data: tPromoteNewfamily[]) => {
  const requestBody = {
    content: data
  };

  return request<tPromoteNewfamily[]>({
    method: REQUEST_METHOD.POST,
    url: `${version}/new-families/promote`,
    data: requestBody
  });
}

export const lineInNewfamily = (lineOutNewFamilyId: number) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/line-out-new-families/${lineOutNewFamilyId}/line-in`,
  });

}
