import { useQuery } from "@tanstack/react-query";
import { getAccountList } from "..";
import accountQueryKeys from "../accountQueryKeys";
import { tAccount } from "../types";

export const useAccountsQuery = () => {
  return useQuery<tAccount[]>(
    [accountQueryKeys.base],
    async () => await getAccountList(),
    {
      onSuccess: _data => console.log("_data", _data)
    }
  );
};
