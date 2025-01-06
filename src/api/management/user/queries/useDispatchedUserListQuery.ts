import { useQuery } from "@tanstack/react-query";
import { getDispatchedUserList } from "api/management/user";
import queryKeys from "api/queryKeys";

export const useDispatchedUserListQuery = () => {
  return useQuery({
    queryKey: [queryKeys.USER_DISPATCHED],
    queryFn: () => getDispatchedUserList(),
    select: data => data.content
  });
};
