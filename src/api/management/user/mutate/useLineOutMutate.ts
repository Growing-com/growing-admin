import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLineOutUser } from "..";
import { handleError } from "utils/error";
import queryKeys from "api/queryKeys";
import GRAlert from "@component/atom/alert/GRAlert";

const useLineOutMutate = (onClickClose: () => void) => {
  const queryClient = useQueryClient();

  const { mutateAsync: lineOutMutate } = useMutation({
    mutationFn: postLineOutUser,
    onError: error => handleError(error, "라인아웃 에러"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.USER_LIST] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.USER_LINE_OUT] });
      GRAlert.success("라인아웃 완료");
      onClickClose();
    }
  });

  return { lineOutMutate };
};

export default useLineOutMutate;
