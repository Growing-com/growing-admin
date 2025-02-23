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
  /** @description 출석 사유  @example "12341" */
  etc?: string;
  /** @description 출석 상태  @example "ATTEND" */
  status: tAttendanceStatus;
  /** @description 통계 날짜  @example "2023-09-17" */
  week: string;
  /** @description 재적 @example 20 */
  totalRegistered?: number;
  /** @description 통계 숫자 @example 20 */
  totalAttendance?: number;
};

export type tStatisticsItem = {
  /** @description 통계 날짜 @example "2023-09-17" */
  week: string;
  /** @description 재적 @example 20 */
  totalRegistered: number;
  /** @description 통계 숫자 @example 20 */
  totalAttendance: number;
};

export type tAttendanceCheckListItem = {
  //** 7, */
  managerId: number;
  //** "유지현", */
  managerName: string;
  //** "강성혁", */
  leaderName: string;
  //** "한예찬", */
  userName: string;
  //** "MALE", */
  sex: tSex;
  //** 2, */
  grade: number;
  //** "010-2832-6075", */
  phoneNumber: string;
  attendanceItems: tAttendanceItem[];
  userId?: number;
};

export type tStatisticsCheckListItem = {
  //** "유지현", */
  managerName: string;
  //** 2, */
  grade: number;
  attendanceItems: tStatisticsItem[];
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
  teamId: number;
};

export type tAttendUser = {
  userId: number;
  name: string;
};

export type tAttendanceProgress = {
  /** @description 출석 체크 1명도 없는 리더 이름 목록 */
  notProgressedLeaders: tAttendUser[];
  /** @description 출석체크 완료 인원 */
  totalProgressed: number;
  /** @description 재적인원 */
  totalRegistered: number;
  /** @description  출석 체크 상황 알아본 날짜 @example "2023-11-05"*/
  week: string;
};
