import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import menuStore from "store/clientStore/menuStore";
import { postAccountLogout } from "..";

export const useLogoutMutate = () => {
  const queryClient = useQueryClient();
  const { removeMenu } = menuStore();
  const router = useRouter();
  const { mutateAsync: logoutMutate } = useMutation(postAccountLogout, {
    onError: error => {
      console.log("error", error);
    },
    onSuccess: () => {
      removeMenu();
      queryClient.clear();
      router.push("/login");
    }
  });
  return {
    logoutMutate
  };
};
