import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getGraudatedUserList } from "api/management/user";

export const useGraduateUserListQuery = () => {
  return useQuery({
    queryKey: [queryKeys.USER_GRADUATE],
    queryFn: async () => await getGraudatedUserList(),
    select: data => data.content
  });
};
