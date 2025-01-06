import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getTermList } from "api/term";

const useTermListQuery = () => {
  return useQuery({
    queryKey: [queryKeys.TERM_LIST],
    queryFn: async () => await getTermList(),
    staleTime: Infinity,
    select: data => data.content
  });
};

export default useTermListQuery;
