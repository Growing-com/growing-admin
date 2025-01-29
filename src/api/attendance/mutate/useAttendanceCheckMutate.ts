import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import GRAlert from "@component/atom/alert/GRAlert";
import { postGroupUserAttandance, postStumpAttandance } from "..";

const useAttendanceCheckMutate = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: groupUserAttendanceMutate } = useMutation({
    mutationFn: postGroupUserAttandance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ATTENDANCE_NORMAL_CHECK]
      });
      GRAlert.success("출석 체크 완료");
    }
  });

  const { mutateAsync: stumpAttendanceMutate } = useMutation({
    mutationFn: postStumpAttandance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ATTENDANCE_STUMP_CHECK]
      });
      GRAlert.success("출석 체크 완료");
    }
  });

  return { groupUserAttendanceMutate, stumpAttendanceMutate };
};

export default useAttendanceCheckMutate;
