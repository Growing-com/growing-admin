import { useQuery } from "@tanstack/react-query";
import { getTermMemberByCodyId } from "..";
import termQueryKeys from "./termQueryKeys";

export const useTermMembersByCodyQuery = ({
  termId,
  codyId
}: {
  termId: number;
  codyId?: number;
}) => {
  return useQuery(
    [termQueryKeys.MEMBERS_BY_CODY, codyId],
    async () => {
      if (codyId) {
        return await getTermMemberByCodyId(termId, codyId);
      }
    },
    {
      enabled: !!codyId,
      select: _data => _data?.content
    }
  );
};
