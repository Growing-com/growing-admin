import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { promteNewFamily } from "..";

export const useNewfamilyPromoteMutate = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: newFamilyPromoteMutateAsync } = useMutation(
    promteNewFamily,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.NEW_FAMILY_V2]);
      },
      onError: (error: unknown) => {
        console.log("error", error);
      }
    }
  );
  return { newFamilyPromoteMutateAsync };
};
