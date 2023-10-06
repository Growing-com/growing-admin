import { useMutation } from "@tanstack/react-query";
import { postAttendanceCheck } from "..";

export const useAttendanceCheckMutate = () => {
  return useMutation(postAttendanceCheck, {
    onError: error => {
      console.log("error", error);
    }
  });
};
