import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { getDutyCount } from "..";

const useDutyCountQuery = ({ termId }: { termId: number }) => {
  return useQuery(
    [queryKeys.TERM_DUTY_COUNT, termId],
    async () => await getDutyCount({ termId }),
    {
      select: data => data.content
    }
  );
};

export default useDutyCountQuery;