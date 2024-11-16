import GRAlert from "@component/atom/alert/GRAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { handleError } from "utils/error";
import { updateCody, createCody, deleteCody } from "..";

const useCodyMutate = (onClickClose?: () => void) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createCodyMutate } = useMutation(createCody, {
    onError: error => handleError(error, "코디 생성 에러"),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.TERM_CODY]);
      queryClient.invalidateQueries([queryKeys.TERM_ALL_LEADERS]);
      GRAlert.success("코디 생성 완료");
      if (onClickClose) onClickClose();
    }
  });

  const { mutateAsync: updateCodyMutate } = useMutation(updateCody, {
    onError: error => handleError(error, "코디 수정 에러"),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.TERM_CODY]);
      queryClient.invalidateQueries([queryKeys.TERM_ALL_LEADERS]);
      queryClient.invalidateQueries([queryKeys.TERM_SMALL_GROUP_LEADER]);
      queryClient.invalidateQueries([queryKeys.SMALL_GROUP_LEADER_BY_CODY]);
      GRAlert.success("코디 수정 완료");
    }
  });

  const { mutateAsync: deleteCodyMutate } = useMutation(deleteCody, {
    onError: error => handleError(error, "코디 삭제 에러"),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.TERM_CODY]);
      queryClient.invalidateQueries([queryKeys.TERM_ALL_LEADERS]);
      GRAlert.success("코디 삭제 완료");
      if (onClickClose) onClickClose();
    }
  });

  return { createCodyMutate, updateCodyMutate, deleteCodyMutate };
};

export default useCodyMutate;
