import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getTermUserStatistics } from "..";

export const useTermUserStatistics = ({ week }: { week: string }) => {
  return useQuery(
    [queryKeys.TERM_USER_STATISTICS, week],
    async () => await getTermUserStatistics(week),
    {
      select: _data => _data.content,
      staleTime: Infinity
    }
  );
};
 