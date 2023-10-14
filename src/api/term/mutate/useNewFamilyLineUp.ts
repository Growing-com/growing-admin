import GRAlert from "@component/atom/alert/GRAlert";
import { useMutation } from "@tanstack/react-query";
import { postNewFamilyLineUp } from "..";

type tUseNewFamilyLineUp = {
  onClose: () => void;
};

export const useNewFamilyLineUp = ({ onClose }: tUseNewFamilyLineUp) => {
  return useMutation(postNewFamilyLineUp, {
    onError: () => {
      GRAlert.error("라인 업 실패");
    },
    onSuccess: () => {
      GRAlert.success("라인 업 완료");
      onClose();
    }
  });
};
