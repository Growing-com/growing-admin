import { rest } from "msw";
import { accountDumpData } from "./data/accountDumpData";

const accountList = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(accountDumpData));
};

export const handlers = [rest.get("/accounts", accountList)];
