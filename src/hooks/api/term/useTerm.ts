import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import {
  getAllLeaders,
  getNewFamilyGroup,
  getCodyAndSmallGroups
} from "api/term";
import useDutyCountQuery from 'api/term/queries/useDutyCountQuery';
import useTermCodyQuery from "api/term/queries/useTermCodyQuery";
import { convertOptions } from "utils";

const useTerm = ({ termId }: { termId: number }) => {
  if (!termId) {
    throw new Error("termId is required");
  }

  const { data: termCodyAndSmallGroups } = useQuery(
    [queryKeys.TERM_SMALL_GROUP_LEADER],
    async () =>
      await getCodyAndSmallGroups({
        termId
      }),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      select: _data => _data.content
    }
  );

  const { data: termNewFamilyLeader } = useQuery(
    [queryKeys.TERM_NEW_FAMILY_LEADER],
    async () =>
      await getNewFamilyGroup({
        termId
      }),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      select: _data => _data.content
    }
  );

  const { data: termAllLeaderGroup } = useQuery(
    [queryKeys.TERM_ALL_LEADERS],
    async () => await getAllLeaders({ termId }),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      select: _data => _data.content
    }
  );

  const { data: termCody } = useTermCodyQuery({ termId });
  const { data: termDutyCount } = useDutyCountQuery({ termId });

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
    // termSmallGroupLeaderOptions,
    termCody,
    termCodyOptions,
    termCodyAndSmallGroups,
    termAllLeaderGroup,
    termDutyCount
  };
};

export default useTerm;
