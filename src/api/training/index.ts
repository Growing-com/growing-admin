import { REQUEST_METHOD, request } from "api";
import { tTrainingDetail, tTrainingType } from "./type";
import { convertDateString } from "utils/DateUtils";
import { Dayjs } from "dayjs";

type tGetTrainingDetailParam = {
  type?: tTrainingType;
};

export const getTrainingDetail = ({ type }: tGetTrainingDetailParam) => {
  if (!type) Promise.reject();
  return request<tTrainingDetail>({
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
  startDate: Dayjs;
  endDate: Dayjs;
  etc: string;
  userIds: number[];
};

export const createTraining = (data: tCreateTraining) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `/training`,
    data: {
      ...data,
      startDate: convertDateString(data.startDate),
      endDate: convertDateString(data.endDate)
    }
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

export const getMembersByTrainingId = (trainingId: number) => {
  return request({
    method: REQUEST_METHOD.GET,
    url: `/trainings/${trainingId}`
  });
};
