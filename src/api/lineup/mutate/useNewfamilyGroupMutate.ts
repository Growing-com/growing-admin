import GRAlert from "@component/atom/alert/GRAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { handleError } from "utils/error";
import {
  createNewFamilyGroup,
  updateNewFamilyGroup,
  deleteNewFamilyGroup
} from "..";

const useNewfamilyGroupMutate = (onClickClose: () => void) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createNewFamilyGroupMutate } = useMutation(
    createNewFamilyGroup,
    {
      onError: error => handleError(error, "새가족 순모임 생성 에러"),
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.TERM_NEW_FAMILY_LEADER]);
        queryClient.invalidateQueries([queryKeys.TERM_ALL_LEADERS]);
        GRAlert.success("새가족 순모임 생성 완료");
        onClickClose();
      }
    }
  );

  const { mutateAsync: updateNewFamilyGroupMutate } = useMutation(
    updateNewFamilyGroup,
    {
      onError: error => handleError(error, "새가족 순모임 수정 에러"),
      onSuccess: () => {
        GRAlert.success("새가족 순모임 수정 완료");
        onClickClose();
      }
    }
  );

  const { mutateAsync: deleteNewFamilyGroupMutate } = useMutation(
    deleteNewFamilyGroup,
    {
      onError: error => handleError(error, "새가족 순모임 삭제 에러"),
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.TERM_NEW_FAMILY_LEADER]);
        queryClient.invalidateQueries([queryKeys.TERM_ALL_LEADERS]);
        GRAlert.success("새가족 순모임 삭제 완료");
        onClickClose();
      }
    }
  );

  return {
    createNewFamilyGroupMutate,
    updateNewFamilyGroupMutate,
    deleteNewFamilyGroupMutate
  };
};

export default useNewfamilyGroupMutate;
