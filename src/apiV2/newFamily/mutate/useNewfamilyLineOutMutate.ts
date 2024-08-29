import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { lineOutNewFamily } from "..";

export const useNewFamilyLineOutMutate = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: lineOutNewFamilyMutateAsync } = useMutation(
    lineOutNewFamily,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.NEW_FAMILY_V2]);
      },
    }
  );

  return { lineOutNewFamilyMutateAsync };
};
