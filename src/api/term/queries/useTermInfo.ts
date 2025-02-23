import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getTermInfo } from "..";

export const useTermInfo = () => {
  return useQuery([queryKeys.TERM], async () => await getTermInfo(), {
    select: _data => _data.content,
    staleTime: Infinity
  });
};
 