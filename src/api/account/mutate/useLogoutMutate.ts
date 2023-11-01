import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import menuStore from "store/clientStore/menuStore";
import { postAccountLogout } from "..";
import accountQueryKeys from "../queries/accountQueryKeys";

export const useLogoutMutate = () => {
  const queryClient = useQueryClient();
  const { removeMenu } = menuStore();
  const router = useRouter();
  const { mutate: logoutMutate } = useMutation(postAccountLogout, {
    onError: error => {
      console.log("error", error);
    },
    onSuccess: () => {
      removeMenu();
      queryClient.invalidateQueries([accountQueryKeys.ACCOUNT_INFO]);
      router.replace("/login");
    }
  });
  return {
    logoutMutate
  };
};
