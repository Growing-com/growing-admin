import { REQUEST_METHOD, request } from "api";
import { Dayjs } from "dayjs";
import { convertDateString } from "utils/DateUtils";
import { tTrainingDetail, tTrainingType } from "./type";

type tGetTrainingDetailParam = {
  type?: tTrainingType;
};

export const getTrainingDetail = ({ type }: tGetTrainingDetailParam) => {
  if (!type) return Promise.reject();
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

export const getMembersByTrainingId = (trainingId?: number) => {
  if( !trainingId) return Promise.reject();
  return request<tTrainingDetail>({
    method: REQUEST_METHOD.GET,
    url: `/trainings/${trainingId}`
  });
};
