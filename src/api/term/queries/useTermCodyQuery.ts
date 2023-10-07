import { useQuery } from "@tanstack/react-query";
import { getTermCody } from "..";
import termQueryKeys from "./termQueryKeys";

export const useTermCodyQuery = ({ termId }: { termId: number }) => {
  return useQuery(
    [termQueryKeys.TERM_CORDI],
    async () => await getTermCody(termId),
    {
      select: _data => _data.content,
      staleTime: Infinity
    }
  );
};
