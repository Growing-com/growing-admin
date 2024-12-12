import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getMembersByCody } from "..";

const useMembersByCodyQuery = (codyId?: number) => {
  return useQuery(
    [queryKeys.MEMBERS_BY_CODY, codyId],
    async () => await getMembersByCody(codyId),
    {
      enabled: !!codyId,
      select: data => data.content
    }
  );
};

export default useMembersByCodyQuery;
