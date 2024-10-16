import { useQuery } from "@tanstack/react-query";
import { getNewfamilies } from "api/newfamily";
import queryKeys from "api/queryKeys";

const useNewfamilyLeaders = ({
  newfamilyGroupId
}: {
  newfamilyGroupId: number;
}) => {
  return useQuery(
    [queryKeys.NEW_FAMILY, newfamilyGroupId],
    async () => await getNewfamilies({ newFamilyGroupId: newfamilyGroupId }),
    {
      select: _data => _data.content
    }
  );
};
