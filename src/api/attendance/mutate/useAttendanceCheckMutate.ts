import GRAlert from "@component/atom/alert/GRAlert";
import { useMutation } from "@tanstack/react-query";
import { postAttendanceCheck } from "..";

export const useAttendanceCheckMutate = () => {
  return useMutation(postAttendanceCheck, {
    onError: error => {
      console.log("error", error);
      GRAlert.error("출석체크 실패");
    },
    onSuccess: () => {
      GRAlert.success("출석체크 완료");
    }
  });
};
