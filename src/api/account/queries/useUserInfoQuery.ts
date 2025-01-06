import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "..";
import queryKeys from "api/queryKeys";

export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: [queryKeys.ACCOUNT_INFO],
    queryFn: async () => await getUserInfo(),
    enabled: false,
    staleTime: Infinity,
    select: data => data.content
  });
};
