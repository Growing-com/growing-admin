import { QueryFunction, QueryKey, useMutation as useOriginMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useMutation<TQueryFnData, TData>(
  queryKey: QueryKey, 
  queryFn: QueryFunction<TQueryFnData, QueryKey>, 
  option?: UseMutationOptions<TQueryFnData, AxiosError, TData, QueryKey>
){
  return useOriginMutation(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    ...option,
  });
}
 