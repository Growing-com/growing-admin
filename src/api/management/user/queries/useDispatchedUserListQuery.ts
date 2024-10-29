import { useQuery } from "@tanstack/react-query";
import { getDispatchedUserList } from "api/management/user";
import queryKeys from "api/queryKeys";

export const useDispatchedUserListQuery = () => {
  return useQuery([queryKeys.USER_DISPATCHED], () => getDispatchedUserList(), {
    select: data => data.content
  });
};
