import { tOptions } from "@component/atom/dataEntry/dataEntryType";
import { useQuery } from "@tanstack/react-query";
import { getLeaderList } from "..";
import accountQueryKeys from "../accountQueryKeys";
import { tAccount } from "../types";

export const useLeadersQuery = () => {
  return useQuery<tAccount[], unknown, tOptions>(
    [accountQueryKeys.leader],
    async () => await getLeaderList(),
    {
      onSuccess: _data => console.log("_data", _data),
      select: _data => {
        return _data.map(leader => ({
          label: leader.name,
          value: leader.id
        }));
      }
    }
  );
};
