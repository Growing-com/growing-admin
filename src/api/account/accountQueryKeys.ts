const accountQueryKeys = {
  base: "account",
  list: _page => [accountQueryKeys.base, ..._page]
};

export default accountQueryKeys;
