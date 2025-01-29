import GRAlert from "@component/atom/alert/GRAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { handleError } from "utils/error";
import { changePastor, createPastor, deletePastor } from "..";

const usePastorMutate = (onClickClose: () => void) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createPastorMutate } = useMutation({
    mutationFn: createPastor,
    onError: error => handleError(error, "교역자 생성 에러"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.TERM_PASTOR]
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.TERM_ALL_LEADERS]
      });
      GRAlert.success("교역자 생성 완료");
      onClickClose();
    }
  });

  const { mutateAsync: changePastorMutate } = useMutation({
    mutationFn: changePastor,
    onError: error => handleError(error, "교역자 교체 에러"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.TERM_PASTOR]
      });
      GRAlert.success("교역자 교체 완료");
      onClickClose();
    }
  });

  const { mutateAsync: deletePastorMutate } = useMutation({
    mutationFn: deletePastor,
    onError: error => handleError(error, "교역자 삭제 에러"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.TERM_PASTOR]
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.TERM_ALL_LEADERS]
      });
      GRAlert.success("교역자 삭제 완료");
      onClickClose();
    }
  });

  return { createPastorMutate, changePastorMutate, deletePastorMutate };
};

export default usePastorMutate;
