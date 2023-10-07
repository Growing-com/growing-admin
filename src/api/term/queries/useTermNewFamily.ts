import { useQuery } from "@tanstack/react-query";
import termQuerykeys from "api/term/termQuerykeys";
import { getTermNewFamily } from "..";

export const useTermNewFamily = ({ termId }: { termId: number }) => {
  return useQuery(
    [termQuerykeys.NEW_FAMILY],
    async () => await getTermNewFamily(termId),
    {
      select: _data => _data.content,
      staleTime: Infinity
    }
  );
};
