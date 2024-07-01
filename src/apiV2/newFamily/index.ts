import { REQUEST_METHOD, request } from "api";
import { Nullable } from "common/type-aliases";
import { tNewFamilyV2 } from "./type";

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

interface tLineOutNewFamilesResponse extends tNewFamilyV2 {
  lineOutNewFamilyId?: number;
  newFamilyGroupLeaderName: Nullable<string>;
  lineoutAt: string;
}

export const getLineOutNewFamiles = () => {
  return request<tLineOutNewFamilesResponse[]>({
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
