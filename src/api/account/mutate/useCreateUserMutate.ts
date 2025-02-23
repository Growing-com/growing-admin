import { useMutation } from "@tanstack/react-query";
import { createUser } from "..";

export const useCreateUserMutate = () => {
  const { mutateAsync: createUserMutateAsync } = useMutation(createUser, {
    onError: error => {
      console.log("error", error);
    }
  });
  return { createUserMutateAsync };
};
