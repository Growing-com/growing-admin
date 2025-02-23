import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getTermCody } from "..";

export const useTermCodyQuery = ({ termId }: { termId: number }) => {
  return useQuery(
    [queryKeys.TERM_CORDI],
    async () => await getTermCody(termId),
    {
      select: _data => _data.content,
      staleTime: Infinity
    } 
  );
};
