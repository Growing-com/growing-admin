import { tSex } from "api/account/types";
import { tAttendanceItems } from "./../newfamily/type";

//* ATTEND: "출석", ABSENT: "결석", ONLINE: "온라인", NONE: "미완료"*/
export type tAttendanceStatus = "ATTEND" | "ABSENT" | "ONLINE" | "NONE";
export type tAttendanceCheckStatus = Exclude<tAttendanceStatus, "NONE">;

export type tAttendanceCheckDataParams = {
  date: string;
  codyId?: number;
};

export type tAttendanceData = {
  userId: number;
  name: string;
  sex: tSex;
  grade: number;
  codyName?: string;
  leaderName?: string;
  attendItems: tAttendanceItems[];
};

export type tUserAttendanceCheckItems = {
  userId: number;
  status: tAttendanceStatus;
  reason?: string;
};

export type tPostGroupUserAttandance = {
  date: string;
  termId: number;
  codyId: number;
  attendanceItems: tUserAttendanceCheckItems[];
};
