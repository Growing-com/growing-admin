import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import GRAlert from "@component/atom/alert/GRAlert";
import { postGroupUserAttandance } from "..";

const useAttendanceCheckMutate = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: groupUserAttendanceMutate } = useMutation(
    postGroupUserAttandance,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.ATTENDANCE_NORMAL_CHECK]);
        GRAlert.success("출석 체크 완료");
      }
    }
  );

  return { groupUserAttendanceMutate };
};

export default useAttendanceCheckMutate;
