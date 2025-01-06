import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getLeaderByCody } from "..";

const useLeaderByCodyQuery = (codyId?: number) => {
  const { data: leaderByCody } = useQuery({
    queryKey: [queryKeys.SMALL_GROUP_LEADER_BY_CODY, codyId],
    queryFn: async () => await getLeaderByCody(codyId),
    enabled: !!codyId,
    select: data => data.content
  });

  const smallGroupLeaderByCody = leaderByCody?.filter(
    leader => leader.groupType !== "NEW_FAMILY_GROUP"
  );
  const newfamilyLeaderByCody = leaderByCody?.filter(
    leader => leader.groupType !== "SMALL_GROUP"
  );

  return { smallGroupLeaderByCody, newfamilyLeaderByCody, leaderByCody };
};

export default useLeaderByCodyQuery;
