import { tOptions } from "@component/atom/dataEntry/type";
import { useTermCodyQuery } from "api/term/queries/useTermCodyQuery";
import { useTermMembersByCodyQuery } from "api/term/queries/useTermMembersByCodyQuery";
import { useTermNewFamilyLeader } from "api/term/queries/useTermNewFamilyLeader";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const INIT_TERM_ID = 1;
const INIT_OPTIONS = [] as tOptions[];
type tUseTermInfoOptionQueries = () => {
  newFamilyLeaderOptions: tOptions[];
  termCordyOptions: tOptions[];
  termLeaderOptions: tOptions[];
  setSelectedCodyId: Dispatch<SetStateAction<number | undefined>>;
  selectedCodyId?: number;
};
export const useTermInfoOptionQueries: tUseTermInfoOptionQueries = () => {
  const [newFamilyLeaderOptions, setNewFamilyLeaderOptions] =
    useState<tOptions[]>(INIT_OPTIONS);
  const [termCordyOptions, setTermCordyOptions] =
    useState<tOptions[]>(INIT_OPTIONS);
  const [termLeaderOptions, setTermLeaderOptions] =
    useState<tOptions[]>(INIT_OPTIONS);

  const [selectedCodyId, setSelectedCodyId] = useState<number>();

  // {teamId: 34, leaderName: '이순경'}
  const { data: newFamilyLeaderData, isSuccess: newFamilyLeaderIsSuccess } =
    useTermNewFamilyLeader({
      termId: INIT_TERM_ID
    });

  const { data: termCody, isSuccess: termCodyIsSuccess } = useTermCodyQuery({
    termId: INIT_TERM_ID
  });

  const { data: leaderByCody, isSuccess: leaderByCodyIsSuccess } =
    useTermMembersByCodyQuery({
      termId: INIT_TERM_ID,
      codyId: selectedCodyId
    });

  useEffect(() => {
    if (newFamilyLeaderIsSuccess) {
      setNewFamilyLeaderOptions(
        newFamilyLeaderData.map(_newFamilyLeader => ({
          value: _newFamilyLeader.teamId,
          label: _newFamilyLeader.leaderName
        }))
      );
    }
  }, [newFamilyLeaderData, newFamilyLeaderIsSuccess]);

  useEffect(() => {
    if (termCodyIsSuccess) {
      setTermCordyOptions(
        termCody.map(_termCordy => ({
          value: _termCordy.userId,
          label: _termCordy.name
        }))
      );
    }
  }, [termCody, termCodyIsSuccess]);

  useEffect(() => {
    if (leaderByCodyIsSuccess && leaderByCody?.length) {
      setTermLeaderOptions(
        leaderByCody.map(_termCordy => ({
          value: _termCordy.teamId,
          label: _termCordy.leaderName
        }))
      );
    }
  }, [leaderByCody, leaderByCodyIsSuccess]);

  return {
    newFamilyLeaderOptions,
    termCordyOptions,
    termLeaderOptions,
    selectedCodyId,
    setSelectedCodyId
  };
};
