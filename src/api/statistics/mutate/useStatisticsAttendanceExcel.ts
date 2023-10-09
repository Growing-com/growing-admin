import { useMutation } from "@tanstack/react-query";
import { postStatisticsAttendanceJob } from "..";

export const useStatisticsAttendanceExcel = () => {
  return useMutation(postStatisticsAttendanceJob, {
    onError: error => {
      console.log("error", error);
    }
  });
};
