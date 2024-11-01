import { REQUEST_METHOD, request } from "api";
import { tLoginParam, tUser, tUserAccount } from "./types";

const version = "v1";

export const postAccountLogin = (loginData: tLoginParam) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/auth/login`,
    data: loginData
  });
};

export const postAccountLogout = () => {
  return request({
    method: REQUEST_METHOD.POST,
    url: `${version}/auth/logout`
  });
};

export const getUserInfo = () => {
  return request<tUserAccount>({
    method: REQUEST_METHOD.GET,
    url: `${version}/my-info`
  });
};

export const getUserList = () => {
  return request<tUser[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/users`
  });
};
