const accountQueryKeys = {
  base: "account",
  list: (_page: string[]) => [accountQueryKeys.base, ..._page]
};

export default accountQueryKeys;
