const accountQueryKeys = {
  base: "account",
  list: (_page: string[]) => [accountQueryKeys.base, ..._page],
  leader: "account-leader"
};

export default accountQueryKeys;
