import { useQuery } from "@tanstack/react-query";
import { getTermCody } from "..";
import termQuerykeys from "../termQuerykeys";

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
