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
    termCodyAndSmallGroups: currentTermCodyAndSmallGroups,
    termAllLeaderGroup: currentTermAllLeaderGroup,
    termDutyCount: currentTermDutyCount
  } = useTerm(currentTermId);

  return {
    currentTermData,
    currentTermId,
    currentTermCodyAndSmallGroups,
    currentTermAllLeaderGroup,
    currentTermDutyCount
  };
};

export default useCurrentTerm;
