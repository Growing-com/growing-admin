import { useQuery } from "@tanstack/react-query";
import { getLeaderList } from "..";
import accountQueryKeys from "../accountQueryKeys";

export const useLeadersQuery = () => {
  return useQuery(
    [accountQueryKeys.ACCOUNT_LEADERS],
    async () => await getLeaderList(),
    {
      onSuccess: _data => console.log("_data", _data)
    }
  );
};
