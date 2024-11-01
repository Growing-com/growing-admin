import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getActiveTerm } from "api/term";
import useTerm from "./useTerm";
import { useState } from "react";

const useCurrentTerm = () => {
  const [currentTermId, setCurrentTermId] = useState<number>();

  const { data: currentTermData } = useQuery(
    [queryKeys.TERM_CURRENT_DATA],
    async () => await getActiveTerm(),
    {
      staleTime: Infinity,
      select: data => data.content,
      onSuccess: data => setCurrentTermId(data.termId)
    }
  );

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
