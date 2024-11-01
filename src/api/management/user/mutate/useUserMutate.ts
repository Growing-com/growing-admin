import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, updateUser } from "..";
import { handleError } from "utils/error";
import queryKeys from "api/queryKeys";
import GRAlert from "@component/atom/alert/GRAlert";

const useUserMutate = (onClickClose: () => void) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createUserMutate } = useMutation(createUser, {
    onError: error => handleError(error, "지체 생성 에러"),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.USER_LIST]);
      GRAlert.success("지체 생성 완료");
      onClickClose();
    }
  });

  const { mutateAsync: updateUserMutate } = useMutation(updateUser, {
    onError: error => handleError(error, "지체 수정 에러"),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.USER_LIST]);
      queryClient.invalidateQueries([queryKeys.USER_DETAIL]);
      GRAlert.success("지체 수정 완료");
    }
  });

  return { createUserMutate, updateUserMutate };
};

export default useUserMutate;
