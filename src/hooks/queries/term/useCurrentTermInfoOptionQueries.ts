import { tOptions } from "@component/atom/dataEntry/type";
import { tUser } from "api/account/types";
import useLeaderByCodyQuery from "api/term/queries/useLeaderByCodyQuery";
import useMembersByCodyQuery from "api/term/queries/useMembersByCodyQuery";
import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import useTerm from "hooks/api/term/useTerm";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { convertOptions } from "utils";

type tUseCurrentTermInfoOptionQueries = () => {
  leaderByCodyOptions: tOptions[];
  smallGroupLeaderByCodyOptions: tOptions[];
  newfamilyLeaderByCodyOptions: tOptions[];
  selectedCodyId?: number;
  setSelectedCodyId: Dispatch<SetStateAction<number | undefined>>;
  currentTermNewFamilyLeaderOptions: tOptions[];
  currentTermCodyOptions: tOptions[];
  membersByCody?: tUser[];
};

export const useCurrentTermInfoOptionQueries: tUseCurrentTermInfoOptionQueries =
  () => {
    const [selectedCodyId, setSelectedCodyId] = useState<number>();

    const { currentTermId } = useCurrentTerm();

    const {
      termNewFamilyLeaderOptions: currentTermNewFamilyLeaderOptions,
      termCodyOptions: currentTermCodyOptions
    } = useTerm(currentTermId);

    const { smallGroupLeaderByCody, newfamilyLeaderByCody, leaderByCody } =
      useLeaderByCodyQuery(selectedCodyId);

    const leaderByCodyOptions = useMemo(
      () =>
        leaderByCody?.map(group => ({
          label: group.leaderName,
          value: group.groupType + "-" + group.groupId
        })) ?? [],
      [leaderByCody]
    );
    
    const smallGroupLeaderByCodyOptions = smallGroupLeaderByCody
      ? convertOptions(smallGroupLeaderByCody, "groupId", "leaderName")
      : [];

    const newfamilyLeaderByCodyOptions = newfamilyLeaderByCody
      ? convertOptions(newfamilyLeaderByCody, "groupId", "leaderName")
      : [];

    const { data: membersByCody } = useMembersByCodyQuery(selectedCodyId);

    return {
      leaderByCodyOptions,
      smallGroupLeaderByCodyOptions,
      newfamilyLeaderByCodyOptions,
      selectedCodyId,
      setSelectedCodyId,
      currentTermNewFamilyLeaderOptions,
      currentTermCodyOptions,
      membersByCody
    };
  };
