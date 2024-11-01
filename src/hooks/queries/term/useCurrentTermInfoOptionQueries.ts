import { tOptions } from "@component/atom/dataEntry/type";
import { tUser } from "api/account/types";
import useLeaderByCodyQuery from "api/term/queries/useLeaderByCodyQuery";
import useMembersByCodyQuery from "api/term/queries/useMembersByCodyQuery";
import { tGroup } from "api/term/type";
import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import useTerm from "hooks/api/term/useTerm";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type tUseCurrentTermInfoOptionQueries = () => {
  leaderByCody?: tGroup[];
  // leaderByCodyOptions: tOptions[];
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

    const { data: leaderByCody } = useLeaderByCodyQuery(selectedCodyId);

    const {
      termNewFamilyLeaderOptions: currentTermNewFamilyLeaderOptions,
      termCodyOptions: currentTermCodyOptions
    } = useTerm(currentTermId);

    // const leaderByCodyOptions = leaderByCody
    //   ? convertOptions(leaderByCody, "groupId", "leaderName")
    //   : [];

    const { data: membersByCody } = useMembersByCodyQuery(
      selectedCodyId,
      undefined
    );

    return {
      // leaderByCodyOptions,
      leaderByCody,
      selectedCodyId,
      setSelectedCodyId,
      currentTermNewFamilyLeaderOptions,
      currentTermCodyOptions,
      membersByCody
    };
  };
