import { useQuery } from "@tanstack/react-query";
import { getTermNewFamily } from "..";
import termQueryKeys from "../termQueryKeys";

export const useTermNewFamily = ({ termId }: { termId: number }) => {
  return useQuery(
    [termQueryKeys.NEW_FAMILY],
    async () => await getTermNewFamily(termId),
    {
      select: _data => _data.content,
      staleTime: Infinity
    }
  );
};
