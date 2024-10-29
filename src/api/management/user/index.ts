import { REQUEST_METHOD, request } from "api";
import {
  tDispatchedUser,
  tGraduatedUser,
  tLineOutUser,
  tPostDispatchUser,
  tPostGraduateUser,
  tPostLineOutUser
} from "./type";

const version = "v1";

export const getDispatchedUserList = () => {
  return request<tDispatchedUser[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/dispatched-users`
  });
};

export const postDispatchUser = (data: tPostDispatchUser[]) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/users/dispatch`,
    data: { content: data }
  });
};

export const returnDispatchedUser = ({
  dispatchUserId
}: {
  dispatchUserId: number;
}) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/dispatched-users/${dispatchUserId}/return`
  });
};

export const getGraudatedUserList = () => {
  return request<tGraduatedUser[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/graduated-users`
  });
};

export const postGraduateUser = (data: tPostGraduateUser) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/users/graduate`,
    data
  });
};

export const getLineOutUserList = () => {
  return request<tLineOutUser[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/line-out-users`
  });
};

export const postLineOutUser = (data: tPostLineOutUser[]) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/line-out`,
    data: { content: data }
  });
};

export const lineInUser = ({ lineOutUserId }: { lineOutUserId: number }) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/line-out-users/${lineOutUserId}/line-in`
  });
};
