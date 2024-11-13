import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getActiveTerm } from "api/term";
import useTerm from "./useTerm";

const useCurrentTerm = () => {
  const { data: currentTermData } = useQuery(
    [queryKeys.TERM_CURRENT_DATA],
    async () => await getActiveTerm(),
    {
      staleTime: Infinity,
      select: data => data.content
    }
  );

  const currentTermId = currentTermData ? currentTermData.termId : undefined;

  const {
    termDutyCount: currentTermDutyCount,
    termAllLeaderGroup: currentTermAllLeaderGroup,
    termPastor: currentTermPastor,
    termCody: currentTermCody,
    termCodyAndSmallGroups: currentTermCodyAndSmallGroups,
    termNewFamilyLeader: currentTermNewFamilyLeader,
    termSmallGroupLeader: currentTermSmallGroupLeader
  } = useTerm(currentTermId);

  return {
    currentTermData,
    currentTermId,
    currentTermAllLeaderGroup,
    currentTermDutyCount,
    currentTermPastor,
    currentTermCody,
    currentTermCodyAndSmallGroups,
    currentTermSmallGroupLeader,
    currentTermNewFamilyLeader
  };
};

export default useCurrentTerm;
