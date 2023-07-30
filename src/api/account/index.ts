import { REQUEST_METHOD, request } from "api";
import { tAccount, tLoginParam, tRole } from "./types";

export const getAccountList = () => {
  return request<tAccount[]>({
    method: REQUEST_METHOD.GET,
    url: "/accounts"
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
    url: "api/auth/login",
    data: loginData
  });
};
