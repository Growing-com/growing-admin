import {
  QueryFunction,
  QueryKey,
  useQuery as useOriginQuery,
  UseQueryOptions
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useQueryTemp<TQueryFnData, TData>(
  queryKey: QueryKey,
  queryFn: QueryFunction<TQueryFnData, QueryKey>,
  option?: UseQueryOptions<TQueryFnData, AxiosError, TData, QueryKey>
) {
  return useOriginQuery({
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    ...option
  });
}
