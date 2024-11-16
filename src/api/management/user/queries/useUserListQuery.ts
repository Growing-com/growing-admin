import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getUserList } from "..";
import { useMemo } from "react";

export const useUserListQuery = () => {
  const { data: userList, isLoading } = useQuery(
    [queryKeys.USER_LIST],
    async () => await getUserList(),
    {
      select: data => data.content
    }
  );

  const notPlacedUserList = useMemo(() => {
    return userList ? userList.filter(user => user.duty === "NOT_PLACED") : [];
  }, [userList]);

  return { userList, isLoading, notPlacedUserList };
};
