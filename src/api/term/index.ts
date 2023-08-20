import { REQUEST_METHOD, request } from "api";
import { tTermCody } from "./types";

export const getTermCody = (termId: number) => {
  return request<tTermCody[]>({
    method: REQUEST_METHOD.GET,
    url: `term/${termId}/cody`
  });
};

export const getTermMemberByCodyId = (termId: number, codyId: number) => {
  return request<tTermCody[]>({
    method: REQUEST_METHOD.GET,
    url: `/term/${termId}/cody/${codyId}/members`
  });
};
