import { REQUEST_METHOD, request } from "api";
import { Dayjs } from "dayjs";
import { convertDateString } from "utils/DateUtils";
import { tTrainingDetail, tTrainingType } from "./type";

type tGetTrainingDetailParam = {
  type?: tTrainingType;
};

export const getTrainingSubContentList = ({
  type
}: tGetTrainingDetailParam) => {
  if (!type) return Promise.reject();
  return request<tTrainingDetail[]>({
    method: REQUEST_METHOD.GET,
    url: `/training`,
    params: { type }
  });
};

export const getTrainingDetail = (trainingId?: number) => {
  if (!trainingId) return Promise.reject();
  return request<tTrainingDetail>({
    method: REQUEST_METHOD.GET,
    url: `/trainings/${trainingId}`
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

type tUpdateTrainingParam = {
  trainingId: number;
  type?: tTrainingType;
  name: string;
  startDate: Dayjs;
  endDate: Dayjs;
  etc: string;
};

export const updateTraining = ({
  trainingId,
  ...data
}: tUpdateTrainingParam) => {
  return request({
    method: REQUEST_METHOD.PUT,
    url: `/trainings/${trainingId}`,
    data: {
      ...data,
      startDate: convertDateString(data.startDate),
      endDate: convertDateString(data.endDate)
    }
  });
};
