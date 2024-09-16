import { tOptions } from "@component/atom/dataEntry/type";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getNewFamilyGroup, getSmallGroupLeader } from "api/term";
import { useEffect, useState } from "react";
import { convertOptions } from "utils";

const useTerm = ({ termId }: { termId: number }) => {
  if (!termId) {
    throw new Error("termId is required");
  }
  const [termSmallGroupLeaderOptions, setTermSmallGroupLeaderOptions] =
    useState<tOptions[]>();
  const [termNewFamilyLeaderOptions, setTermNewFamilyLeaderOptions] =
    useState<tOptions[]>();

  const {
    data: termSmallGroupLeader,
    isSuccess: termSmallGroupLeaderIsSuccess
  } = useQuery(
    [queryKeys.TERM_SMALL_GROUP_LEADER],
    async () =>
      await getSmallGroupLeader(
      //   {
      //   termId
      // }
      ),
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
        await getNewFamilyGroup(
          // {
          //   termId
          // }
          ),
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
    if (termSmallGroupLeaderIsSuccess) {
      const smallGroupOptions = convertOptions(
        termSmallGroupLeader,
        "smallGroupId",
        "smallGroupLeaderName"
      );
      setTermSmallGroupLeaderOptions(smallGroupOptions);
    }
  }, [termSmallGroupLeaderIsSuccess]);

  return {
    termNewFamilyLeader,
    termNewFamilyLeaderOptions,
    termSmallGroupLeader,
    termSmallGroupLeaderOptions
  };
};

export default useTerm;
