import { tOptions } from "@component/atom/dataEntry/type";
import { tUser } from "api/account/types";
import useLeaderByCodyQuery from "api/term/queries/useLeaderByCodyQuery";
import useMembersByCodyQuery from "api/term/queries/useMembersByCodyQuery";
import { tGroup } from "api/term/type";
import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import useTerm from "hooks/api/term/useTerm";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { convertOptions } from "utils";

type tUseCurrentTermInfoOptionQueries = () => {
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

    const { smallGroupLeaderByCody, newfamilyLeaderByCody } =
      useLeaderByCodyQuery(selectedCodyId);

    const {
      termNewFamilyLeaderOptions: currentTermNewFamilyLeaderOptions,
      termCodyOptions: currentTermCodyOptions
    } = useTerm(currentTermId);

    const smallGroupLeaderByCodyOptions = smallGroupLeaderByCody
      ? convertOptions(smallGroupLeaderByCody, "groupId", "leaderName")
      : [];

    const newfamilyLeaderByCodyOptions = newfamilyLeaderByCody
      ? convertOptions(newfamilyLeaderByCody, "groupId", "leaderName")
      : [];

    const { data: membersByCody } = useMembersByCodyQuery(
      selectedCodyId,
      undefined
    );

    return {
      smallGroupLeaderByCodyOptions,
      newfamilyLeaderByCodyOptions,
      selectedCodyId,
      setSelectedCodyId,
      currentTermNewFamilyLeaderOptions,
      currentTermCodyOptions,
      membersByCody
    };
  };
