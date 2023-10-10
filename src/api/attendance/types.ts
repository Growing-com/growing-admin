import { tSex } from "api/account/types";

export type tAttendanceCheckParam = {
  /** @description 코디 아이디  @example 1 */
  codyId: number;
  /** @description 주차 날짜  @example 2023-07-01 */
  week: string;
};

export type tAttendanceParam = {
  /** @description 시작 날짜  @example 2023-07-01 */
  startDate: string;
  /** @description 마지막 날짜  @example 2023-07-29 */
  endDate: string;
  /** @description 학년  @example 10 */
  grade?: number;
  /** @description 검색 이름  @example 강 */
  baseName?: string;
  /** @description 코디 아이디  @example 1 */
  codyId?: number;
};

export type tAttendanceSearch = {
  /** @description 시작 날짜  @example 2023-07-01 */
  startDate: string;
  /** @description 마지막 날짜  @example 2023-07-29 */
  endDate: string;
  /** @description 새가족 여부 @example ture */
  isNewOnly?: boolean;
  /** @description 학년 @example 1 */
  grade?: number;
  /** @description 이름 @example  홍길동*/
  name?: string;
  /** @description 코디 아이디 @example 1 */
  codyId?: number;
  page?: number;
  size?: number;
};

export type tAttendance = {
  teamMemberId: number;
  status: tAttendanceStatus;
  teamId: number;
  etc: string;
};

//* ATTEND: "출석", ABSENT: "결석", ONLINE: "온라인" */
export type tAttendanceStatus = "ATTEND" | "ABSENT" | "ONLINE";

export type tAttendanceCheck = {
  /** @description 날짜 2023-07-09 */
  week: string;
  attendances: tAttendance[];
};

export type tAttendanceItem = {
  /** @description  @example 7 */
  attendanceId: number;
  /** @description  @example "12341" */
  etc?: string;
  /** @description  @example "ATTEND" */
  status: tAttendanceStatus;
  /** @description  @example "2023-09-17" */
  week: string;
};

export type tAttendanceCheckItem = {
  /**  "강성혁", */
  leaderName: string;
  /**  80, */
  teamMemberId: number;
  /**  "조예진", */
  userName: string;
  /**  1, */
  grade: number;
  /**  "FEMALE", */
  sex: tSex;
  /**  62, */
  attendanceId: number;
  /**  "ATTEND", */
  status: tAttendanceStatus;
  /**  "2023-10-01", */
  week: string;
  /**  "" */
  etc: string;
};
