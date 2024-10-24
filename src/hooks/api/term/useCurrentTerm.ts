import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getActiveTerm } from "api/term";
import useTerm from "./useTerm";
import { useState } from "react";

const INITIAL_TERM = 1;

const useCurrentTerm = () => {
  const [currentTermId, setCurrentTermId] = useState<number>(INITIAL_TERM);

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
    termAllLeaderGroup: currentTermAllLeaderGroup
  } = useTerm({ termId: currentTermId });

  return {
    currentTermData,
    currentTermId,
    currentTermCodyAndSmallGroups,
    currentTermAllLeaderGroup
  };
};

export default useCurrentTerm;
