import GRAlert from "@component/atom/alert/GRAlert";
import { useMutation } from "@tanstack/react-query";
import { postNewFamilyLineOut } from "..";

type tUseNewFamilyLineOut = {
  onClose: () => void;
};

export const useNewFamilyLineOut = ({ onClose }: tUseNewFamilyLineOut) => {
  return useMutation(postNewFamilyLineOut, {
    onError: () => {
      GRAlert.error("라인 아웃 실패");
    },
    onSuccess: () => {
      GRAlert.success("라인 아웃 완료");
      onClose();
    }
  });
};
