import { REQUEST_METHOD, request } from "api";
import { tAccount, tLoginParam } from "./types";

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
