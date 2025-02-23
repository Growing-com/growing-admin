import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getUserDetail } from "..";

export const useUserDetailQuery = (userId?: number) => {
  return useQuery(
    [queryKeys.ACCOUNT_DETAIL, userId],
    async () => await getUserDetail(userId),
    {
      select: _data => _data.content,
      enabled: !!userId
    }
  );
};
