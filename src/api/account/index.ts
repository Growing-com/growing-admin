import { REQUEST_METHOD, request } from "api";
import type { tAccount, tLoginParam, tRoleResponse } from "./types";
export const USER_PREFIX = "/user";

export const getUserList = () => {
  return request<tAccount[]>({
    method: REQUEST_METHOD.GET,
    url: `${USER_PREFIX}`
  });
};

export const getUserDetail = (userId?: number) => {
  return request<tAccount>({
    method: REQUEST_METHOD.GET,
    url: `${USER_PREFIX}/${userId}`
  });
};

export const getLeaderList = () => {
  return request<tAccount[]>({
    method: REQUEST_METHOD.GET,
    url: "/leaders"
  });
};

export const getRoles = () => {
  return request<tRoleResponse[]>({
    method: REQUEST_METHOD.GET,
    url: "/roles"
  });
};

export const createUser = (data: any) => {
  return request<tAccount[]>({
    method: REQUEST_METHOD.POST,
    url: USER_PREFIX,
    data
  });
};

export type tUpdateUserParams = {
  userId?: number;
  data: tAccount;
};

export const updateUser = ({ userId, data }: tUpdateUserParams) => {
  return request<tAccount[]>({
    method: REQUEST_METHOD.PUT,
    url: `${USER_PREFIX}/${userId}`,
    data
  });
};

export const postAccountLogin = (loginData: tLoginParam) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: "/auth/login",
    data: loginData
  });
};

export const postAccountLogout = () => {
  return request({
    method: REQUEST_METHOD.POST,
    url: "/auth/logout"
  });
};

export const getUserInfo = () => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `${USER_PREFIX}/myInfo`
  });
};
