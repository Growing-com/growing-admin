import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getTermMemberByCodyId } from "..";

export const useTermMembersByCodyQuery = ({
  termId,
  codyId
}: {
  termId: number;
  codyId?: number;
}) => {
  return useQuery(
    [queryKeys.MEMBERS_BY_CODY, codyId],
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
