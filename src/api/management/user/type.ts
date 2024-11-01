import { tUser } from "api/account/types";

export type tLineOutUser = Omit<
  tUser,
  "userId" | "duty" | "phoneNumber" | "leaderName"
> & {
  /** @description 라인아웃 유저 아이디 @example 1 */
  lineOutUserId: number;
  /** @description 라인아웃 날짜  @example  "2024-10-16" */
  lineOutDate: string;
  /** @description 라인아웃된 이유  @example  "장기 미출석" */
  reason?: string;
};

/**
 * @description 파송자 종류
 * MILITARY: 군대
 * ABROAD: 유학
 * MISSIONARY: 선교
 * ETC: 기타
 */
export type tDispatchType = "MILITARY" | "ABROAD" | "MISSIONARY" | "ETC";

export type tDispatchedUser = Omit<tUser, "userId" | "duty"> & {
  /** @description 파송자 아이디 @example 1 */
  dispatchedUserId: number;
  /** @description 파송자 타입 @example "MILITARY" */
  type: tDispatchType;
};

export type tGraduatedUser = Omit<
  tUser,
  "userId" | "duty" | "phoneNumber" | "leaderName"
> & {
  graduatedUserId: number;
  graduateDate: string;
};

export type tPostDispatchUser = {
  userId: number;
  type: tDispatchType;
  sendDate: string;
  returnDate?: string;
};

export type tPostGraduateUser = {
  userIds: number[];
  graduateDate: string;
};

export type tPostLineOutUser = {
  userId: number;
  lineOutDate: string;
  reason?: string;
};
