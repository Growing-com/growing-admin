import { useQuery } from "@tanstack/react-query";
import { getTermNewFamily } from "..";
import termQuerykeys from "../termQuerykeys";

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
