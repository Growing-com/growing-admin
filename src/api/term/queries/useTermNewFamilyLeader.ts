import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getTermNewFamilyLeader } from "..";

// GET http://localhost:8080/api/term/{{termId}}/newTeamLeaders

export const useTermNewFamilyLeader = ({ termId }: { termId: number }) => {
  return useQuery(
    [queryKeys.NEW_FAMILY_LEADER],
    async () => await getTermNewFamilyLeader(termId),
    {
      select: _data => _data.content,
      staleTime: Infinity
    }
  );
};
 