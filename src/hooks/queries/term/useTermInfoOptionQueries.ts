import { tOptions } from "@component/atom/dataEntry/type";
import { useTermNewFamilyLeader } from "api/term/queries/useTermNewFamilyLeader";
import { useEffect, useState } from "react";

const INIT_TERM_ID = 1;
const INIT_OPTIONS = [] as tOptions;
type tUseTermInfoOptionQueries = () => {
  newFamilyLeaderOption: tOptions;
};
export const useTermInfoOptionQueries: tUseTermInfoOptionQueries = () => {
  const [newFamilyLeaderOption, setNewFamilyLeaderOption] =
    useState<tOptions>(INIT_OPTIONS);

  // {teamId: 34, leaderName: '이순경'}
  const { data: newFamilyLeaderData, isSuccess: newFamilyLeaderSuccess } =
    useTermNewFamilyLeader({
      termId: INIT_TERM_ID
    });

  useEffect(() => {
    if (newFamilyLeaderSuccess) {
      setNewFamilyLeaderOption(
        newFamilyLeaderData.map(_newFamilyLeader => ({
          value: _newFamilyLeader.teamId,
          label: _newFamilyLeader.leaderName
        }))
      );
    }
  }, [newFamilyLeaderData, newFamilyLeaderSuccess]);
  return {
    newFamilyLeaderOption
  };
};
