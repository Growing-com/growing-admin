import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getLeaderByCody } from "..";

const useLeaderByCodyQuery = (codyId?: number) => {
  const { data: smallGroupLeaderByCody } = useQuery(
    [queryKeys.SMALL_GROUP_LEADER_BY_CODY, codyId],
    async () => await getLeaderByCody(codyId),
    {
      enabled: !!codyId,
      select: data =>
        data.content.filter(leader => leader.groupType !== "NEW_FAMILY_GROUP")
    }
  );
  const { data: newfamilyLeaderByCody } = useQuery(
    [queryKeys.NEW_FAMILY_GROUP_LEADER_BY_CODY, codyId],
    async () => await getLeaderByCody(codyId),
    {
      enabled: !!codyId,
      select: data =>
        data.content.filter(leader => leader.groupType !== "SMALL_GROUP")
    }
  );

  return { smallGroupLeaderByCody, newfamilyLeaderByCody };
};

export default useLeaderByCodyQuery;
