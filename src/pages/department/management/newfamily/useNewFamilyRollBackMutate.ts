import { lineOutRollBackNewFamily } from "apiV2/newFamily";
import GRAlert from "@component/atom/alert/GRAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { isError } from "utils/validation";

export const useNewFamilyRollBackMutate = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: lineOutRollBackNewFamilyMutateAsync } = useMutation(
    lineOutRollBackNewFamily,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.NEW_FAMILY_LINE_OUT_V2]);
      },
      onError: (error: unknown) => {
        if (isError(error)) {
          GRAlert.error(`${error.message}`);
        } else {
          GRAlert.error("복귀 오류");
        }
      }
    }
  );

  return { lineOutRollBackNewFamilyMutateAsync };
};
