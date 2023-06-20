import { request } from "api";

export const getAccountList = () => {
  return request.get(`/account`);
};
