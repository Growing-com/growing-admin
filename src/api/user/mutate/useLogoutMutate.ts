import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { postAccountLogout } from "..";

export const useLogoutMutate = () => {
  const router = useRouter();
  const { mutate: logoutMutate } = useMutation(postAccountLogout, {
    onError: error => {
      console.log("error", error);
    },
    onSuccess: _data => {
      console.log("_data", _data);
      console.log("_data", _data.headers["set-cookie"]);
      router.replace("/");
    }
  });
  return {
    logoutMutate
  };
};
