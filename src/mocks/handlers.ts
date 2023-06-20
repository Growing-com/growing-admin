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

const getAccountList = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(accountDumpData));
};

const postAccount = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(accountDumpData));
};

const getAttendanceList = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(accountDumpData));
};

const postAttendance = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(accountDumpData));
};

const getAttendanceStatistics = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(accountDumpData));
};

const getDepartment = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(accountDumpData));
};
