import { useQuery } from "@tanstack/react-query";
import { getUserDetail } from "..";
import accountQuerykeys from "../accountQuerykeys";

export const useUserDetailQuery = (userId?: number) => {
  return useQuery(
    [accountQuerykeys.ACCOUNT_DETAIL, userId],
    async () => await getUserDetail(userId),
    {
      select: _data => _data.content,
      enabled: !!userId
    }
  );
};
