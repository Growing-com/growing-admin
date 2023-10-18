import { useQuery } from "hooks/queries/useQuery";
import { getUserInfo } from "..";
import accountQueryKeys from "./accountQueryKeys";

export const useUserInfoQuery = () => {
  return useQuery([accountQueryKeys.ACCOUNT], async () => await getUserInfo(), {
    select: data => data.content
  });
};
