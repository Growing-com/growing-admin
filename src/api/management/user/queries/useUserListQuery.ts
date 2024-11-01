import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getUserList } from '..';

export const useUserListQuery = () => {
  return useQuery([queryKeys.USER_LIST], async () => await getUserList(), {
    select: data => data.content
  });
};
