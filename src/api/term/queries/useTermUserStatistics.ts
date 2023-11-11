import { useQuery } from "@tanstack/react-query";
import { getTermUserStatistics } from "..";
import termQueryKeys from "./termQueryKeys";

export const useTermUserStatistics = ({ week }: { week: string }) => {
  return useQuery(
    [termQueryKeys.TERM_USER_STATISTICS, week],
    async () => await getTermUserStatistics(week),
    {
      select: _data => _data.content,
      staleTime: Infinity
    }
  );
};
