import { useQuery } from "@tanstack/react-query";
import { getUserList } from "..";
import accountQueryKeys from "../accountQueryKeys";
import { tAccount } from "../types";

export const useUserListQuery = () => {
  return useQuery<tAccount[]>(
    [accountQueryKeys.base],
    async () => await getUserList(),
    {
      select: data => data.data
    }
  );
};
