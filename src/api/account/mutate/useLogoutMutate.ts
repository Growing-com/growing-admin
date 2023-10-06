import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { postAccountLogout } from "..";

export const useLogoutMutate = () => {
  const router = useRouter();
  const { mutate: logoutMutate } = useMutation(postAccountLogout, {
    onError: error => {
      console.log("error", error);
    },
    onSuccess: () => {
      router.replace("/login");
    }
  });
  return {
    logoutMutate
  };
};
