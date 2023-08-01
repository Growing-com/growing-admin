import { useMutation } from "@tanstack/react-query";
import { postAccountLogin } from "..";

export const useLoginMutate = () => {
  const { mutateAsync } = useMutation(postAccountLogin);
  return { mutateAsync };
};
