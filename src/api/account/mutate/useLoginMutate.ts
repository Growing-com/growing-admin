import { useMutation } from "@tanstack/react-query";
import { postAccountLogin } from "..";

export const useLoginMutate = () => {
  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: postAccountLogin,
    onError: error => {
      console.log("error", error);
    }
  });
  return { mutateAsync, isSuccess };
};
