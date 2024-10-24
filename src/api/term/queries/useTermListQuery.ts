import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getTermList } from "api/term";

const useTermListQuery = () => {
  return useQuery([queryKeys.TERM_LIST], async () => await getTermList(), {
    staleTime: Infinity,
    select: data => data.content
  });
};

export default useTermListQuery;
