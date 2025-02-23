import GRAlert from "@component/atom/alert/GRAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { handleError } from "utils/error";
import {
  createNewFamilyGroup,
  updateNewFamilyGroup,
  deleteNewFamilyGroup
} from "..";

const useNewfamilyGroupMutate = (onClickClose?: () => void) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createNewFamilyGroupMutate } = useMutation({
    mutationFn: createNewFamilyGroup,
    onError: error => handleError(error, "새가족 순모임 생성 에러"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.TERM_NEW_FAMILY_LEADER]
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.TERM_ALL_LEADERS]
      });
      GRAlert.success("새가족 순모임 생성 완료");
      if (onClickClose) onClickClose();
    }
  });

  const { mutateAsync: updateNewFamilyGroupMutate } = useMutation({
    mutationFn: updateNewFamilyGroup,
    onError: error => handleError(error, "새가족 순모임 수정 에러"),
    onSuccess: () => {
      GRAlert.success("새가족 순모임 수정 완료");
    }
  });

  const { mutateAsync: deleteNewFamilyGroupMutate } = useMutation({
    mutationFn: deleteNewFamilyGroup,
    onError: error => handleError(error, "새가족 순모임 삭제 에러"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.TERM_NEW_FAMILY_LEADER]
      });

      queryClient.invalidateQueries({
        queryKey: [queryKeys.TERM_ALL_LEADERS]
      });
      GRAlert.success("새가족 순모임 삭제 완료");
      if (onClickClose) onClickClose();
    }
  });

  return {
    createNewFamilyGroupMutate,
    updateNewFamilyGroupMutate,
    deleteNewFamilyGroupMutate
  };
};

export default useNewfamilyGroupMutate;
