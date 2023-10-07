import { useQuery } from "@tanstack/react-query";
import { getUserDetail } from "..";
import accountQueryKeys from "../accountQueryKeys";

export const useUserDetailQuery = (userId?: number) => {
  return useQuery(
    [accountQueryKeys.ACCOUNT_DETAIL, userId],
    async () => await getUserDetail(userId),
    {
      select: _data => _data.content,
      enabled: !!userId
    }
  );
};
