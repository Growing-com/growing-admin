import { useQuery } from "@tanstack/react-query";
import { getRoles } from "..";
import queryKeys from "api/queryKeys";

export const useRolesQuery = () => {
  return useQuery(
    [queryKeys.ACCOUNT_ROLES],
    async () => await getRoles(),
    {
      onSuccess: _data => console.log("_data", _data)
    }
  );
};
