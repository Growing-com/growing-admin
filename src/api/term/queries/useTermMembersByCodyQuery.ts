import { useQuery } from "@tanstack/react-query";
import { getAttendance } from "api/attendance";
import termQuerykeys from "../termQuerykeys";

export const useTermMembersByCodyQuery = ({
  week,
  codyId
}: {
  week: string;
  codyId?: number;
}) => {
  return useQuery(
    [termQuerykeys.MEMBERS_BY_CODY, week, codyId],
    async () => {
      if (codyId) {
        return await getAttendance({ week, codyId });
      }
    },
    {
      enabled: !!week && !!codyId,
      staleTime: Infinity,
      select: _data => _data?.content
    }
  );
};
