import { useMutation } from "@tanstack/react-query";
import { createUser, tUpdateUserParams, updateUser } from "..";

export const useUserMutate = () => {
  const { mutateAsync: createUserMutateAsync } = useMutation(createUser, {
    onError: error => {
      console.log("error", error);
    }
  });

  const { mutateAsync: updateUserMutateAsync } = useMutation(
    async ({ userId, data }: tUpdateUserParams) =>
      await updateUser({ userId, data }),
    {
      onError: error => {
        console.log("error", error);
      }
    }
  );
  return { createUserMutateAsync, updateUserMutateAsync };
};
