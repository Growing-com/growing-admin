import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getLeaderByCody } from "..";

const useLeaderByCodyQuery = ({ codyId }: { codyId: number }) => {
  return useQuery(
    [queryKeys.LEADER_BY_CODY, codyId],
    async () => await getLeaderByCody({ codyId }),
    {
      select: data => data.content
    }
  );
};

export default useLeaderByCodyQuery;
