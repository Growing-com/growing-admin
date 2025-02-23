import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useQueriesLoading() {
  const client = useQueryClient();
  const queries = client.getQueryCache().findAll();

  const [queryChangedCount, setQueryChangedCount] = useState(0);

  useEffect(() => {
    if (queries) {
      setQueryChangedCount(queries.length);
    }
  }, [queries]);

  useEffect(() => {
    if (
      queries.every(({ state }) => state.status !== "pending") &&
      queryChangedCount >= 0
    ) {
      setQueryChangedCount(prevState => prevState - 1);
    }
  }, [queries, queryChangedCount]);

  if (queryChangedCount < 0) {
    return false;
  }

  return true;
}
