import { useMutation } from "@tanstack/react-query";
import { postNewFamilyLineUp } from "..";

export const useNewFamilyLineUp = () => {
  return useMutation(postNewFamilyLineUp, {
    onError: error => {
      console.log("error", error);
    }
  });
};
