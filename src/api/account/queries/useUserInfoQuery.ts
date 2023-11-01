import { useQuery } from "hooks/queries/useQuery";
import { getUserInfo } from "..";
import accountQueryKeys from "./accountQueryKeys";

export const useUserInfoQuery = () => {
  return useQuery(
    [accountQueryKeys.ACCOUNT_INFO],
    async () => await getUserInfo(),
    {
      enabled: false,
      staleTime: Infinity,
      select: data => data.content
    }
  );
};
