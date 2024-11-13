import { REQUEST_METHOD, request } from "api";
import { tChangePastor, tCreateCody, tCreatePastor, tUpdateCody } from "./type";

const version = "v1";

export const createPastor = (data: tCreatePastor) => {
  const { pastorUserId, termId } = data;
  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/terms/${termId}/create-pastor`,
    data: { pastorUserId }
  });
};

export const changePastor = (data: tChangePastor) => {
  const { targetSeniorPastorId, termId } = data;
  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/terms/${termId}/switch-senior-pastor`,
    data: { targetSeniorPastorId }
  });
};

export const deletePastor = (pastorId: number) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/pastors/${pastorId}/delete`
  });
};

export const createCody = (data: tCreateCody) => {
  const { codyUserId, termId } = data;

  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/terms/${termId}/create-cody`,
    data: { codyUserId }
  });
};

export const updateCody = (data: tUpdateCody) => {
  const { codyId, smallGroupIds } = data;

  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/codies/${codyId}/update`,
    data: { smallGroupIds }
  });
};

export const deleteCody = (codyId: number) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/codies/${codyId}/delete`
  });
};
