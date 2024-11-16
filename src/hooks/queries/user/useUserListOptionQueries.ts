import { tOptions } from "@component/atom/dataEntry/type";
import { useUserListQuery } from "api/management/user/queries/useUserListQuery";
import { convertOptions } from "utils";

type tUseUserListOptionQueries = () => {
  notPlacedUserListOption: tOptions[];
};

export const useUserListOptionQueries: tUseUserListOptionQueries = () => {
  const { userList } = useUserListQuery();

  const notPlacedUserListOption = userList
    ? convertOptions(
        userList.filter(user => user.duty === "NOT_PLACED"),
        "userId",
        "name"
      )
    : [];

  return { notPlacedUserListOption };
};
