import GRAlert from "@component/atom/alert/GRAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { isError } from "utils/validation";
import { lineOutNewFamily } from "..";

export const useNewFamilyLineOutMutate = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: lineOutNewFamilyMutateAsync } = useMutation(
    lineOutNewFamily,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.NEW_FAMILY_V2]);
      },
      onError: (error: unknown) => {
        if (isError(error)) {
          GRAlert.error(`${error.message}`);
        } else {
          GRAlert.error("라인아웃 오류");
        }
      }
    }
  );

  return { lineOutNewFamilyMutateAsync };
};
