import { REQUEST_METHOD, request } from "api";
import { tAccount } from "./types";

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
