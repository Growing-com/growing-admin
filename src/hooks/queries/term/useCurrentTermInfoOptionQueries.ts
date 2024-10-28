import { tOptions } from "@component/atom/dataEntry/type";
import { tUser } from "api/account/types";
import useLeaderByCodyQuery from "api/term/queries/useLeaderByCodyQuery";
import useMembersByCodyQuery from "api/term/queries/useMembersByCodyQuery";
import { tGroup } from "api/term/type";
import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import useTerm from "hooks/api/term/useTerm";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const INIT_CODY_ID = 1;
const INIT_OPTIONS = [] as tOptions[];

type tUseCurrentTermInfoOptionQueries = () => {
  leaderByCody: tGroup[] | undefined;
  // leaderByCodyOptions: tOptions[];
  selectedCodyId?: number;
  setSelectedCodyId: Dispatch<SetStateAction<number>>;
  currentTermNewFamilyLeaderOptions: tOptions[];
  currentTermCodyOptions: tOptions[];
  membersByCody: tUser[] | undefined;
};

export const useCurrentTermInfoOptionQueries: tUseCurrentTermInfoOptionQueries =
  () => {
    const [selectedCodyId, setSelectedCodyId] = useState<number>(INIT_CODY_ID);

    const { currentTermId } = useCurrentTerm();

    const { data: leaderByCody } = useLeaderByCodyQuery({
      codyId: selectedCodyId
    });

    const {
      termNewFamilyLeaderOptions: currentTermNewFamilyLeaderOptions,
      termCodyOptions: currentTermCodyOptions
    } = useTerm({ termId: currentTermId });

    // const leaderByCodyOptions = leaderByCody
    //   ? convertOptions(leaderByCody, "groupId", "leaderName")
    //   : [];

    const { data: membersByCody } = useMembersByCodyQuery({
      codyId: selectedCodyId
    });

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
