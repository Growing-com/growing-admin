import { filter } from "lodash";
import { rest } from "msw";
import { STATUS, accountDumpData } from "./data/accountDumpData";

export const handlers = () => {
  return [
    rest.get("/accounts", getAccountList),
    rest.get("/leaders", getLeaderList),
    rest.post("/account", postAccount),
    rest.get("/attendance", getAttendanceList),
    rest.post("/attendance", postAttendance),
    rest.get("/attendance/statistics", getAttendanceStatistics),
    rest.get("/department", getDepartment)
  ];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAccountList = (_req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json(accountDumpData));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLeaderList = (_req: any, res: any, ctx: any) => {
  const findLeader = filter(
    accountDumpData,
    account => account.status === STATUS.leader
  );
  return res(ctx.status(200), ctx.json(findLeader));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postAccount = (req: any, res: any, ctx: any) => {
  console.log("req.body", req.body);
  // const findByName = accountDumpData.find( req.body )
  return res(ctx.status(200));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAttendanceList = (_req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json(accountDumpData));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postAttendance = (_req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json(accountDumpData));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAttendanceStatistics = (_req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json(accountDumpData));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDepartment = (_req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json(accountDumpData));
};
