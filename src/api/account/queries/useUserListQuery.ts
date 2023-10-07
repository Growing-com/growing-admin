import { useQuery } from "hooks/queries/useQuery";
import { getUserList } from "..";
import accountQuerykeys from "../accountQuerykeys";

export const useUserListQuery = () => {
  return useQuery([accountQuerykeys.ACCOUNT], async () => await getUserList(), {
    select: data => data.content
  });
};
