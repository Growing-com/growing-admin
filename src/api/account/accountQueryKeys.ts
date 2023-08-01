const accountQueryKeys = {
  base: "account",
  list: (_page: string[]) => [accountQueryKeys.base, ..._page],
  leader: "leaders",
  roles: "roles",
  ACCOUNT_LOGIN: "account_login"
};

export default accountQueryKeys;
