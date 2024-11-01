import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getGraudatedUserList } from "api/management/user";

export const useGraduateUserListQuery = () => {
  return useQuery(
    [queryKeys.USER_GRADUATE],
    async () => await getGraudatedUserList(),
    {
      select: data => data.content
    }
  );
};
