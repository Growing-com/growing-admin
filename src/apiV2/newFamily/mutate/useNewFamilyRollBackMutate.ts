import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { lineOutRollBackNewFamily } from "apiV2/newFamily";

export const useNewFamilyRollBackMutate = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: lineOutRollBackNewFamilyMutateAsync } = useMutation(
    lineOutRollBackNewFamily,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.NEW_FAMILY_LINE_OUT_V2]);
      }
    }
  );

  return { lineOutRollBackNewFamilyMutateAsync };
};
