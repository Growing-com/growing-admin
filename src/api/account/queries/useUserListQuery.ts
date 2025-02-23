import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getUserList } from "..";

export const useUserListQuery = () => {
  return useQuery([queryKeys.ACCOUNT], async () => await getUserList(), {
    select: data => data.content,
    staleTime: Infinity
  });
};
