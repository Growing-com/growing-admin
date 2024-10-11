import { useQuery } from "@tanstack/react-query";
import { getLineUpRequestNewfamilies } from 'api/newfamily';
import queryKeys from "api/queryKeys";


export const useNewfamilyLineupRequestQuery = () => {
  return useQuery(
    [queryKeys.NEW_FAMILY_LINE_UP_REQUEST],
    async () => await getLineUpRequestNewfamilies(),
    {
      select: _data => _data.content
    }
  );
};
