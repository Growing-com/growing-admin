import { REQUEST_METHOD, request } from "api";
import type {
  tAccount,
  tActiveUser,
  tLoginParam,
  tRoleResponse,
  tUser
} from "./types";

export const getUserList = () => {
  return request<tAccount[]>({
    method: REQUEST_METHOD.GET,
    url: `/user`
  });
};

export const getUserDetail = (userId?: number) => {
  return request<tAccount>({
    method: REQUEST_METHOD.GET,
    url: `/user/${userId}`
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
    url: "/user",
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
    url: `/user/${userId}`,
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
  return request<tAccount>({
    method: REQUEST_METHOD.GET,
    url: `/user/myInfo`
  });
};
// activeUsers
export const getActiveUser = () => {
  return request<tActiveUser[]>({
    method: REQUEST_METHOD.GET,
    url: `activeUsers`
  });
};
