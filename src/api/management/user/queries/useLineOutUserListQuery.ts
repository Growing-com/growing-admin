import { useQuery } from "@tanstack/react-query";
import { getLineOutUserList } from "api/management/user";
import queryKeys from "api/queryKeys";

export const useLineOutUserListQuery = () => {
  return useQuery({
    queryKey: [queryKeys.USER_LINE_OUT],
    queryFn: () => getLineOutUserList(),
    select: data => data.content
  });
};
