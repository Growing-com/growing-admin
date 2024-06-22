import { REQUEST_METHOD, request } from "api";
import { tNewFamilyV2 } from "./type";

const version = "v2";

type getNewFamiliesV2Parmas = {
  newFamilyGroupId?: number;
};

export const getNewFamiliesV2 = (params?: getNewFamiliesV2Parmas) => {
  return request<tNewFamilyV2[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/new-families`,
    params
  });
};
