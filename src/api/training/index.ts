import { REQUEST_METHOD, request } from "api";
import { tTrainingType } from "./type";

type tGetTrainingDetailParam = {
  type?: tTrainingType;
};

export const getTrainingDetail = ({ type }: tGetTrainingDetailParam) => {
  if (!type) Promise.reject();
  return request({
    method: REQUEST_METHOD.GET,
    url: `/training`,
    params: { type }
  });
};
