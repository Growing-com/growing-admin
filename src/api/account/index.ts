import { REQUEST_METHOD, request } from "api";
import { tAccount, tLoginParam, tRole } from "./types";

export const getUserList = () => {
  return request<tAccount[]>({
    method: REQUEST_METHOD.GET,
    url: "/users"
  });
};

export const getLeaderList = () => {
  return request<tAccount[]>({
    method: REQUEST_METHOD.GET,
    url: "/leaders"
  });
};

export const getRoles = () => {
  return request<tRole[]>({
    method: REQUEST_METHOD.GET,
    url: "/roles"
  });
};

export const postAccountLogin = (loginData: tLoginParam) => {
  return request({
    method: REQUEST_METHOD.POST,
    url: "/auth/login",
    data: loginData
  });
};
