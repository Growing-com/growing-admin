import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getTermCody, getTermPastor } from "..";

const useTermPastorQuery = (termId?: number) => {
  return useQuery({
    queryKey: [queryKeys.TERM_PASTOR],
    queryFn: async () => await getTermPastor(termId),
    enabled: !!termId,
    select: _data => _data.content,
    staleTime: Infinity
  });
};

export default useTermPastorQuery;
