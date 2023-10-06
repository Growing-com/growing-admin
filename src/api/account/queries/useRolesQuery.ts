import { useQuery } from "@tanstack/react-query";
import { getRoles } from "..";
import accountQueryKeys from "../accountQuerykeys";

export const useRolesQuery = () => {
  return useQuery(
    [accountQueryKeys.ACCOUNT_ROLES],
    async () => await getRoles(),
    {
      onSuccess: _data => console.log("_data", _data)
    }
  );
};
