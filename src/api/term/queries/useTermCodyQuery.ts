import { useQuery } from "@tanstack/react-query";
import termQuerykeys from "api/term/termQuerykeys";
import { getTermCody } from "..";

export const useTermCodyQuery = ({ termId }: { termId: number }) => {
  return useQuery(
    [termQuerykeys.TERM_CORDI],
    async () => await getTermCody(termId),
    {
      select: _data => _data.content,
      staleTime: Infinity
    }
  );
};
