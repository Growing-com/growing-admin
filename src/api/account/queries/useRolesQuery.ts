import { tOptions } from "@component/atom/dataEntry/dataEntryType";
import { useQuery } from "@tanstack/react-query";
import { getRoles } from "..";
import accountQueryKeys from "../accountQueryKeys";
import { tAccount } from "../types";

export const useRolesQuery = () => {
  return useQuery<tAccount[], unknown, tOptions>(
    [accountQueryKeys.roles],
    async () => await getRoles(),
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
