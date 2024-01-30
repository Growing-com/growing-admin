import { useQuery } from "@tanstack/react-query";
import { getActiveUser } from "api/account";
import { tActiveUser } from "api/account/types";
import queryKeys from "api/queryKeys";

// 현재 활동 중인 유저
// 전체 검색 및 유저를 따로 뽑을때 사용한다.
const useActiveUsers = () => {
  const { data } = useQuery(
    [queryKeys.ACTIVE_USERS],
    async () => await getActiveUser(),
    {
      staleTime: Infinity,
      select: _data => _data.content
    }
  );

  const findUserById = (_id: number) => {
    if (data) {
      return data.find(user => user.id === _id);
    }
  };

  const findUserByName = (_name: string) => {
    if (data) {
      return data.find(user => user.name === _name);
    }
  };

  const searchUserByName = (_serachName: string) => {
    let filterUser = [] as tActiveUser[];
    if (data && _serachName) {
      filterUser = data.filter(_user => {
        if (
          _user.name?.indexOf(_serachName) !== -1 ||
          _user.phoneNumber?.indexOf(_serachName) !== -1
        ) {
          return _user;
        }
      });
    }
    return filterUser;
  };

  return {
    activeUsers: data ?? [],
    findUserById,
    findUserByName,
    searchUserByName
  };
};

export default useActiveUsers;
