import { useQuery } from "hooks/queries/useQuery";
import { getUserList } from "..";
import accountQueryKeys from "./accountQueryKeys";

export const useUserListQuery = () => {
  return useQuery([accountQueryKeys.ACCOUNT], async () => await getUserList(), {
    select: data => data.content
  });
};
