import { QueryFunction, QueryKey, useMutation as useOriginMutation, UseMutationOptions, MutationFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';
// TVariables
export function useMutation<TQueryFnData, TData>(
  queryKey: QueryKey, 
  mutationFn: MutationFunction<TQueryFnData,TData>, 
  option?: UseMutationOptions<TQueryFnData, AxiosError, TData, QueryKey>
){
  return useOriginMutation(queryKey, mutationFn, {
    ...option,
  });
}
 