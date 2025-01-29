import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getDetailUser } from "..";

export const useUserDetailQuery = (userId?: number) => {
  return useQuery({
    queryKey: [queryKeys.USER_DETAIL, userId],
    queryFn: async () => await getDetailUser(userId),
    select: data => data.content,
    enabled: !!userId
  });
};
