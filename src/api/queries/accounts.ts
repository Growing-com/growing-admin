import { request } from "api";
import { useQuery } from "hooks/queries/useQuery";

export const accountQueryKey = {
  base: "account",
  list: _page => [accountQueryKey.base, ..._page]
};

export const useAccountsQuery = () => {
  return useQuery(
    [accountQueryKey.base],
    async () => await request.get("/accounts"),
    {
      onSuccess: _data => console.log("_data", _data),
      select: ({ data }) => data
    }
  );
};
