import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getTermCody } from "..";

const useTermCodyQuery = (termId?: number) => {
  return useQuery({
    queryKey: [queryKeys.TERM_CODY],
    queryFn: async () => await getTermCody(termId),
    enabled: !!termId,
    select: _data => _data.content,
    staleTime: Infinity
  });
};

export default useTermCodyQuery;
