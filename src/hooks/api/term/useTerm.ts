import { tOptions } from "@component/atom/dataEntry/type";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getNewFamilies, getSamllGroupLeader } from "apiV2/term";
import { useEffect, useState } from "react";
import { convertOptions } from "utils/indext";

// v2

const useTerm = ({ termId }: { termId: number }) => {
  if (!termId) {
    throw new Error("termId is required");
  }
  const [termSamllGroupLeaderOptions, setTermSamllGroupLeaderOptions] =
    useState<tOptions[]>();
  const [termNewFamilyLeaderOptions, setTermNewFamilyLeaderOptions] =
    useState<tOptions[]>();

  const {
    data: termSamllGroupLeader,
    isSuccess: termSamllGroupLeaderIsSuccess
  } = useQuery(
    [queryKeys.TERM_SMALL_GROUP_LEADER],
    async () =>
      await getSamllGroupLeader({
        termId
      }),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      select: _data => _data.content
    }
  );

  const { data: termNewFamilyLeader, isSuccess: termNewFamilyLeaderIsSuccess } =
    useQuery(
      [queryKeys.TERM_NEW_FAMILY_LEADER],
      async () =>
        await getNewFamilies({
          termId
        }),
      {
        cacheTime: Infinity,
        staleTime: Infinity,
        select: _data => _data.content
      }
    );

  useEffect(() => {
    if (termNewFamilyLeaderIsSuccess) {
      const smallGroupOptions = convertOptions(
        termNewFamilyLeader,
        "newFamilyGroupId",
        "newFamilyGroupLeaderName"
      );
      setTermNewFamilyLeaderOptions(smallGroupOptions);
    }
  }, [termNewFamilyLeaderIsSuccess]);

  useEffect(() => {
    if (termSamllGroupLeaderIsSuccess) {
      const smallGroupOptions = convertOptions(
        termSamllGroupLeader,
        "smallGroupId",
        "smallGroupLeaderName"
      );
      setTermSamllGroupLeaderOptions(smallGroupOptions);
    }
  }, [termSamllGroupLeaderIsSuccess]);

  return {
    termNewFamilyLeader,
    termNewFamilyLeaderOptions,
    termSamllGroupLeader,
    termSamllGroupLeaderOptions
  };
};

export default useTerm;
