import { useQuery } from "@tanstack/react-query";
import { getAccountList } from "..";
import accountQueryKeys from "../accountQueryKeys";

export const useAccountsQuery = () => {
  return useQuery([accountQueryKeys.base], async () => await getAccountList(), {
    onSuccess: _data => console.log("_data", _data)
  });
};
