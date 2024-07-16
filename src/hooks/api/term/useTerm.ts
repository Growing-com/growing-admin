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
  //   const [termSamllGroupLeaderOptions, setTermSamllGroupLeaderOptions] =
  //     useState<tOptions[]>();
  const [termNewFamilyLeaderOptions, setTermNewFamilyLeaderOptions] =
    useState<tOptions[]>();

  const { data: termSamllLeader, isSuccess: termSamllLeaderIsSuccess } =
    useQuery(
      [queryKeys.TERM_SMALL_GROUP_LEADER],
      async () =>
        await getSamllGroupLeader({
          termId
        }),
      {
        cacheTime: Infinity,
        staleTime: Infinity,
        onSuccess: _data => _data.content
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

  return {
    termNewFamilyLeader,
    termNewFamilyLeaderOptions
  };
};

export default useTerm;
