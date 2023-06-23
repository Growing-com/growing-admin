import { rest } from "msw";
import { accountDumpData } from "./data/accountDumpData";

export const handlers = () => {
  return [
    rest.get("/account", getAccountList),
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
const postAccount = (_req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json(accountDumpData));
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
