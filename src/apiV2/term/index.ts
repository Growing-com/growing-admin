import { REQUEST_METHOD, request } from "api";

const version = "v2";

type tSamllGroup = {
  smallGroupId: number;
  smallGroupLeaderName: string;
};

export const getSamllGroupLeader = (termId?: number) => {
  return request<tSamllGroup[]>({
    method: REQUEST_METHOD.GET,
    url: `${version}/term/${termId}/small-groups`
  });
};
