import { useQuery } from "hooks/queries/useQuery";
import { getAccountList } from "..";
import accountQueryKeys from "../accountQuerykeys";

export const useAccountsQuery = () => {
  return useQuery([accountQueryKeys.base], async () => await getAccountList(), {
    onSuccess: _data => console.log("_data", _data),
    select: ({ data }) => data
  });
};
