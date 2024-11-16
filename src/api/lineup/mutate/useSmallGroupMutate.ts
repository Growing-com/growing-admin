import GRAlert from "@component/atom/alert/GRAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { handleError } from "utils/error";
import { createSmallGroup, updateSmallGroup, deleteSmallGroup } from "..";

const useSmallGroupMutate = (onClickClose?: () => void) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createSmallGroupMutate } = useMutation(
    createSmallGroup,
    {
      onError: error => handleError(error, "순모임 생성 에러"),
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.TERM_SMALL_GROUP_LEADER]);
        queryClient.invalidateQueries([queryKeys.TERM_ALL_LEADERS]);
        GRAlert.success("순모임 생성 완료");
        if (onClickClose) onClickClose();
      }
    }
  );

  const { mutateAsync: updateSmallGroupMutate } = useMutation(
    updateSmallGroup,
    {
      onError: error => handleError(error, "순모임 수정 에러"),
      onSuccess: () => {
        GRAlert.success("순모임 수정 완료");
      }
    }
  );

  const { mutateAsync: deleteSmallGroupMutate } = useMutation(
    deleteSmallGroup,
    {
      onError: error => handleError(error, "순모임 삭제 에러"),
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.TERM_SMALL_GROUP_LEADER]);
        queryClient.invalidateQueries([queryKeys.TERM_ALL_LEADERS]);
        GRAlert.success("순모임 삭제 완료");
        if (onClickClose) onClickClose();
      }
    }
  );

  return {
    createSmallGroupMutate,
    updateSmallGroupMutate,
    deleteSmallGroupMutate
  };
};

export default useSmallGroupMutate;
