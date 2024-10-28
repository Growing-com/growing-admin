import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getTermCody } from "..";

const useTermCodyQuery = ({ termId }: { termId: number }) => {
  return useQuery(
    [queryKeys.TERM_CODY],
    async () => await getTermCody({ termId }),
    {
      select: _data => _data.content,
      staleTime: Infinity
    }
  );
};

export default useTermCodyQuery;
