import { REQUEST_METHOD, request } from "api";
import { tNewfamily } from "./type";

const version = "v1";

export const createNewfamily = (data: tNewfamily) => {
  return request<tNewfamily>({
    method: REQUEST_METHOD.POST,
    url: `${version}/new-families/register`,
    data
  });
};

export const updateNewfamily = (data: tNewfamily) => {
  const _newFamilyId = data.newFamilyId
  return request<tNewfamily>({
    method: REQUEST_METHOD.POST,
    url: `${version}/new-families/${_newFamilyId}/update`,
    data
  });
};


export const getNewfamilies = () => {
  return request<tNewfamily[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/new-families`
  });
};

export const getNewfamily = (_newFamilyId: number) => {
  return request<tNewfamily>({
    method: REQUEST_METHOD.GET,
    url: `${version}/new-families/${_newFamilyId}`
  });
}