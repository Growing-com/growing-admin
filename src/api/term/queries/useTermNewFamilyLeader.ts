import { useQuery } from "@tanstack/react-query";
import termQuerykeys from "api/term/termQuerykeys";
import { getTermNewFamilyLeader } from "..";

// GET http://localhost:8080/api/term/{{termId}}/newTeamLeaders

export const useTermNewFamilyLeader = ({ termId }: { termId: number }) => {
  return useQuery(
    [termQuerykeys.NEW_FAMILY_LEADER],
    async () => await getTermNewFamilyLeader(termId),
    {
      select: _data => _data.content,
      staleTime: Infinity
    }
  );
};
