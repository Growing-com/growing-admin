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

type tUpdateTraining = {
  type?: tTrainingType;
  name: string;
  startDate: Date;
  endDate: Date;
  etc: string;
};

export const updateTraining = (trainingId: number, params: tUpdateTraining) => {
  return request({
    method: REQUEST_METHOD.PUT,
    url: `/training/${trainingId}`,
    params
  });
};

export type tCreateTraining = {
  type?: tTrainingType;
  name: string;
  startDate: Date;
  endDate: Date;
  etc: string;
};

export const createTraining = (params: tCreateTraining) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `/training`,
    params
  });
};

type tRegisterMemberTraining = {
  userIds: number[];
};

export const registerMemberTraining = (
  trainingId: number,
  data: tRegisterMemberTraining
) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `/training/${trainingId}/registerMembers`,
    data
  });
};
