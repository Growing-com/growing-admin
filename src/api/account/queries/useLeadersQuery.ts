import { useQuery } from "@tanstack/react-query";
import { getLeaderList } from "..";
import queryKeys from "api/queryKeys";

export const useLeadersQuery = () => {
  return useQuery(
    [queryKeys.ACCOUNT_LEADERS],
    async () => await getLeaderList(),
    {
      onSuccess: _data => console.log("_data", _data)
    }
  );
};
