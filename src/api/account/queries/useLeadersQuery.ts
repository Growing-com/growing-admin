import { useQuery } from "@tanstack/react-query";
import { getLeaderList } from "..";
import accountQuerykeys from "../accountQuerykeys";

export const useLeadersQuery = () => {
  return useQuery(
    [accountQuerykeys.ACCOUNT_LEADERS],
    async () => await getLeaderList(),
    {
      onSuccess: _data => console.log("_data", _data)
    }
  );
};
