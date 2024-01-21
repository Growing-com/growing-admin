
import { REQUEST_METHOD, request } from "api";
import { tTrainingType } from "./type";

type tGetTrainingDetailParam = {
    type: tTrainingType
}

export const getTrainingDetail = (params: tGetTrainingDetailParam) => {
  return request({
    method: REQUEST_METHOD.GET,
    url: `/training`,
    params
  });
};