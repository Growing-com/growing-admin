import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getUserList } from "../../../account";

export const useUserListQuery = () => {
  return useQuery([queryKeys.USER_LIST], async () => await getUserList(), {
    select: data => data.content
  });
};
