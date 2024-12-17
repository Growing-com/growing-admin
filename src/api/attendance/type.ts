import { tSex } from "api/account/types";

//* ATTEND: "출석", ABSENT: "결석", ONLINE: "온라인", NONE: "미완료"*/
export type tAttendanceStatus = "ATTEND" | "ABSENT" | "ONLINE" | "NONE";
export type tAttendanceCheckStatus = Exclude<tAttendanceStatus, "NONE">;

export type tAttendanceItems = {
  /** @description 출결 날짜  @example: “2024-08-08” */
  date: string;
  /** @description 출결 정보  @example: “ABSENT” */
  status: tAttendanceStatus;
  /** @description 출결 이유  @example: "감기 걸림" */
  reason?: string;
};

export type tAttendanceCheckDataParams = {
  date: string;
  codyId?: number;
};

export type tAttendanceCheckData = {
  userId: number;
  name: string;
  sex: tSex;
  grade: number;
  codyName?: string;
  leaderName?: string;
  attendItems: tAttendanceItems[];
  // *[{}] -> {} 로 변경시
  // attendItems: tAttendanceItems;
};

// attendItems 명칭 통일시 제거
export type tStumpAttendanceCheckData = {
  attendanceItems:tAttendanceItems[];
} & Omit<tAttendanceCheckData,"attendItems">

export type tAttendanceData = {
  attendanceItems: tAttendanceItems[];
} & Omit<tAttendanceCheckData, "attendItems">;

export type tUserAttendanceCheckItems = {
  userId: number;
  status: tAttendanceStatus;
  reason?: string;
};

export type tPostStumpAttendnace = Omit<tPostGroupUserAttendance, "codyId">;

export type tPostGroupUserAttendance = {
  date: string;
  termId: number;
  codyId: number;
  attendanceItems: tUserAttendanceCheckItems[];
};

export type tAttendanceRangeData = {
  startDate: string;
  endDate: string;
};
