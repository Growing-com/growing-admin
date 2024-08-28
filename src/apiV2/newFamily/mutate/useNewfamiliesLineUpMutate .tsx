import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { newFamiliesLineUp } from "..";

export const useNewfamiliesLineUpMutate = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: newFamiliesLineUpMutateAsync } = useMutation(
    newFamiliesLineUp,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.NEW_FAMILY_V2]);
      },
      onError: (error: unknown) => {
        console.log("error", error);
      }
    }
  );
  return { newFamiliesLineUpMutateAsync };
};
