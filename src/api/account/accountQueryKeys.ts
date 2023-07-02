const accountQueryKeys = {
  base: "account",
  list: (_page: string[]) => [accountQueryKeys.base, ..._page],
  leader: "leaders",
  roles: "roles"
};

export default accountQueryKeys;
