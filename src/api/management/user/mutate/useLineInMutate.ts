import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLineInUser } from "..";
import { handleError } from "utils/error";
import queryKeys from "api/queryKeys";
import GRAlert from "@component/atom/alert/GRAlert";

const useLineInMutate = (onClickClose: () => void) => {
  const queryClient = useQueryClient();

  const { mutateAsync: lineInMutate } = useMutation(postLineInUser, {
    onError: error => handleError(error, "복귀 에러"),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.USER_LIST]);
      queryClient.invalidateQueries([queryKeys.USER_LINE_OUT]);
      GRAlert.success("복귀 완료");
      onClickClose();
    }
  });

  return { lineInMutate };
};

export default useLineInMutate;
