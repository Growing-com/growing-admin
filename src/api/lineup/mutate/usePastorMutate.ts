import GRAlert from "@component/atom/alert/GRAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { handleError } from "utils/error";
import { changePastor, createPastor, deletePastor } from "..";

const usePastorMutate = (onClickClose: () => void) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createPastorMutate } = useMutation(createPastor, {
    onError: error => handleError(error, "교역자 생성 에러"),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.TERM_PASTOR]);
      queryClient.invalidateQueries([queryKeys.TERM_ALL_LEADERS]);
      queryClient.invalidateQueries([queryKeys.USER_LIST]);
      GRAlert.success("교역자 생성 완료");
      onClickClose();
    }
  });

  const { mutateAsync: changePastorMutate } = useMutation(changePastor, {
    onError: error => handleError(error, "교역자 교체 에러"),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.TERM_PASTOR]);
      GRAlert.success("교역자 교체 완료");
      onClickClose();
    }
  });

  const { mutateAsync: deletePastorMutate } = useMutation(deletePastor, {
    onError: error => handleError(error, "교역자 삭제 에러"),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.TERM_PASTOR]);
      queryClient.invalidateQueries([queryKeys.TERM_ALL_LEADERS]);
      GRAlert.success("교역자 삭제 완료");
      onClickClose();
    }
  });

  return { createPastorMutate, changePastorMutate, deletePastorMutate };
};

export default usePastorMutate;
