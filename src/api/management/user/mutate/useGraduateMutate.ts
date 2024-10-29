import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postGraduateUser } from "..";
import { handleError } from "utils/error";
import queryKeys from "api/queryKeys";
import GRAlert from "@component/atom/alert/GRAlert";

const useGraduateMutate = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: graduateMutate } = useMutation(postGraduateUser, {
    onError: error => handleError(error, "졸업 에러"),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.USER_LIST]);
      queryClient.invalidateQueries([queryKeys.USER_GRADUATE]);
      GRAlert.success("졸업 완료");
    }
  });

  return { graduateMutate };
};

export default useGraduateMutate;
