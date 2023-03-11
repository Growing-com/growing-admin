import { useQuery as useOriginQuery } from '@tanstack/react-query';

export function useQuery(queryKey, queryFn, option) {
  return useOriginQuery(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    ...option,
  });
}
