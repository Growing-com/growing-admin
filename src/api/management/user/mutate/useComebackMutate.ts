import { useMutation, useQueryClient } from "@tanstack/react-query";
import { comebackDispatchedUser } from "..";
import { handleError } from "utils/error";
import queryKeys from "api/queryKeys";
import GRAlert from "@component/atom/alert/GRAlert";

const useComebackMutate = (onClickClose: () => void) => {
  const queryClient = useQueryClient();

  const { mutateAsync: comebackMutate } = useMutation(comebackDispatchedUser, {
    onError: error => handleError(error, "파송 복귀 에러"),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.USER_LIST]);
      queryClient.invalidateQueries([queryKeys.USER_DISPATCHED]);
      GRAlert.success("파송 복귀 완료");
      onClickClose();
    }
  });

  return { comebackMutate };
};

export default useComebackMutate;
