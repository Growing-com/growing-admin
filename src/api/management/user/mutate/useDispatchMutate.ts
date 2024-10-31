import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postDispatchUser } from "..";
import { handleError } from "utils/error";
import queryKeys from "api/queryKeys";
import GRAlert from "@component/atom/alert/GRAlert";

const useDispatchMutate = (onClickClose: () => void, resetSelection: () =>void) => {
  const queryClient = useQueryClient();

  const { mutateAsync: dispatchMutate } = useMutation(postDispatchUser, {
    onError: error => handleError(error, "파송 요청 에러"),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.USER_LIST]);
      queryClient.invalidateQueries([queryKeys.USER_DISPATCHED]);
      GRAlert.success("파송 완료");
      onClickClose();
      resetSelection();
    }
  });

  return { dispatchMutate };
};

export default useDispatchMutate;
