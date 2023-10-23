import { useQuery } from "@tanstack/react-query";
import { getTermInfo } from "..";
import termQueryKeys from "./termQueryKeys";

export const useTermInfo = () => {
  return useQuery([termQueryKeys.TERM], async () => await getTermInfo(), {
    select: _data => _data.content,
    staleTime: Infinity
  });
};
