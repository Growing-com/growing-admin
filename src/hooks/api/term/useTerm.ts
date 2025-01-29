import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import {
  getAllLeaders,
  getNewFamilyGroup,
  getCodyAndSmallGroups,
  getSmallGroup
} from "api/term";
import useDutyCountQuery from "api/term/queries/useDutyCountQuery";
import useTermCodyQuery from "api/term/queries/useTermCodyQuery";
import useTermPastorQuery from "api/term/queries/useTermPastorQuery";
import { convertOptions } from "utils";

const useTerm = (termId?: number) => {
  const { data: termCodyAndSmallGroups } = useQuery({
    queryKey: [queryKeys.TERM_CODY_AND_SMALL_GROUPS],
    queryFn: async () => await getCodyAndSmallGroups(termId),
    enabled: !!termId,
    select: _data => _data.content
  });

  const { data: termSmallGroupLeader } = useQuery({
    queryKey: [queryKeys.TERM_SMALL_GROUP_LEADER],
    queryFn: async () => await getSmallGroup(termId),
    enabled: !!termId,
    gcTime: Infinity,
    staleTime: Infinity,
    select: _data => _data.content
  });

  const { data: termNewFamilyLeader } = useQuery({
    queryKey: [queryKeys.TERM_NEW_FAMILY_LEADER],
    queryFn: async () => await getNewFamilyGroup(termId),

    enabled: !!termId,
    gcTime: Infinity,
    staleTime: Infinity,
    select: _data => _data.content
  });

  const { data: termAllLeaderGroup } = useQuery({
    queryKey: [queryKeys.TERM_ALL_LEADERS],
    queryFn: async () => await getAllLeaders(termId),
    enabled: !!termId,
    gcTime: Infinity,
    staleTime: Infinity,
    select: _data => _data.content
  });

  const { data: termPastor } = useTermPastorQuery(termId);
  const { data: termCody } = useTermCodyQuery(termId);
  const { data: termDutyCount } = useDutyCountQuery(termId);

  const termNewFamilyLeaderOptions = termNewFamilyLeader
    ? convertOptions(
        termNewFamilyLeader,
        "newFamilyGroupId",
        "newFamilyGroupLeaderName"
      )
    : [];

  const termCodyOptions = termCody
    ? convertOptions(termCody, "codyId", "codyName")
    : [];

  return {
    termNewFamilyLeader,
    termNewFamilyLeaderOptions,
    termSmallGroupLeader,
    termPastor,
    termCody,
    termCodyOptions,
    termCodyAndSmallGroups,
    termAllLeaderGroup,
    termDutyCount
  };
};

export default useTerm;
