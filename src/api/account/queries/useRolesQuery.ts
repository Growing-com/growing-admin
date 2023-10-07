import { useQuery } from "@tanstack/react-query";
import { getRoles } from "..";
import accountQuerykeys from "../accountQuerykeys";

export const useRolesQuery = () => {
  return useQuery(
    [accountQuerykeys.ACCOUNT_ROLES],
    async () => await getRoles(),
    {
      onSuccess: _data => console.log("_data", _data)
    }
  );
};
