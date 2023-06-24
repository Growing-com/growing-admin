import { request } from "api";
import { tAccount } from "./types";

export const getAccountList = () => {
  return request<tAccount[]>({
    method: "get",
    url: "/account"
  });
};
