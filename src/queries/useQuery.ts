import { QueryFunction, QueryKey, useQuery as useOriginQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useQuery<TQueryFnData, TData>(
  queryKey: QueryKey, 
  queryFn: QueryFunction<TQueryFnData, QueryKey>, 
  option?: UseQueryOptions<TQueryFnData, AxiosError, TData, QueryKey>
){
  return useOriginQuery(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    ...option,
  });
}
 