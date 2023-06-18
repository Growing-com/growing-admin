import { request } from "api";
import { useQuery } from "hooks/queries/useQuery";
import accountQueryKeys from "../accountQuerykeys";

export const useAccountsQuery = () => {
  return useQuery(
    [accountQueryKeys.base],
    async () => await request.get("/accounts"),
    {
      onSuccess: _data => console.log("_data", _data),
      select: ({ data }) => data
    }
  );
};
