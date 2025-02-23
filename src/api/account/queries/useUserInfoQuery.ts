import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getUserInfo } from "..";

export const useUserInfoQuery = () => {
  return useQuery(
    [queryKeys.ACCOUNT_INFO],
    async () => await getUserInfo(),
    {
      enabled: false,
      staleTime: Infinity,
      select: data => data.content  
    }
  );
};
