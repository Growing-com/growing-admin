import { useMutation, useQueryClient } from "@tanstack/react-query";
import { comebackDispatchedUser } from "..";
import { handleError } from "utils/error";
import queryKeys from "api/queryKeys";
import GRAlert from "@component/atom/alert/GRAlert";

const useCombackMutate = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: combackMutate } = useMutation(comebackDispatchedUser, {
    onError: error => handleError(error, "파송 복귀 에러"),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.USER_LIST]);
      queryClient.invalidateQueries([queryKeys.USER_DISPATCHED]);
      GRAlert.success("파송 복귀 완료");
    }
  });

  return { combackMutate };
};

export default useCombackMutate;
