import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getActiveTerm } from "api/term";
import { useEffect, useState } from "react";
import useTerm from "./useTerm";

const INITIAL_TERM = 1;

const useCurrentTerm = () => {
  const [currentTermId, setCurrentTermId] = useState<number>(INITIAL_TERM);
  const { data: currentTermData } = useQuery(
    [queryKeys.CURRENT_TERM],
    async () => await getActiveTerm(),
    {
      staleTime: Infinity,
      // API 변경 시 [0]삭제
      select: data => data.content[0],
      onSuccess: data => setCurrentTermId(data.termId as number)
    }
  );

  const { termSmallGroupLeader: currentTermSmallGroupLeaders } = useTerm({
    termId: currentTermId
  });

  const { termNewFamilyLeaderOptions: currentTermNewFamilyLeaderOptions } =
    useTerm({
      termId: currentTermId
    });

  return {
    currentTermData,
    currentTermId,
    currentTermSmallGroupLeaders,
    currentTermNewFamilyLeaderOptions
  };
};

export default useCurrentTerm;
