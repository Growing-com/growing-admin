import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getTermNewFamily } from "..";

export const useTermNewFamily = ({ termId }: { termId: number }) => {
  return useQuery(
    [queryKeys.NEW_FAMILY],
    async () => await getTermNewFamily(termId),
    {
      select: _data => _data.content,
      staleTime: Infinity
    }
  );
};
 