import {
  MutationFunction,
  QueryKey,
  UseMutationOptions,
  useMutation as useOriginMutation
} from "@tanstack/react-query";
import { AxiosError } from "axios";
// TVariables
export function useMutationTemp<TQueryFnData, TData>(
  queryKey: QueryKey,
  mutationFn: MutationFunction<TQueryFnData, TData>,
  option?: UseMutationOptions<TQueryFnData, AxiosError, TData, QueryKey>
) {
  return useOriginMutation(queryKey, mutationFn, {
    ...option
  });
}
