import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getNewFamilyGroupMembers, getSmallGroupMembers } from "..";

export const useGroupMembersQueries = ({
  smallGroupId,
  newFamilyGroupId
}: {
  smallGroupId?: number;
  newFamilyGroupId?: number;
}) => {
  const { data: smallGroupMembers } = useQuery({
    queryKey: [queryKeys.LINE_UP_UPDATE.SMALL_GROUP_MEMBERS],
    queryFn: async () => await getSmallGroupMembers(smallGroupId),
    enabled: !!smallGroupId,
    select: data => data.content
  });

  const { data: newfamilyGroupMembers } = useQuery({
    queryKey: [queryKeys.LINE_UP_UPDATE.NEW_FAMILY_GROUP_MEMBERS],
    queryFn: async () => await getNewFamilyGroupMembers(newFamilyGroupId),
    enabled: !!newFamilyGroupId,
    select: data => data.content
  });

  return { smallGroupMembers, newfamilyGroupMembers };
};
