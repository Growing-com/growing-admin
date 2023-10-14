import type { tAccount, tSex } from "api/account/types";

export type tTermCody = {
  /** @description 코디 아이디 @example  1, */
  userId: number;
  /** @description 코디 이름 @example  "이종민", */
  name: string;
};

export type tTermLeader = {
  /** @description 학년 @example 1 */
  grade: number;
  /** @description 팀 리더 이름  @example "강성혁" */
  leaderName: string;
  /** @description 팀 멤버  @example "조예진" */
  memberName: string;
  /** @description 성별  @example "FEMALE" */
  sex: tSex;
  /** @description 팀 id  @example 2 */
  teamId: number;
  /** @description: 팀 멤버 id  @example 80 */
  teamMemberId: number;
};

export type tTermMember = {
  /** @description  @example  9 */
  grade: number;
  /** @description  @example  "우상욱" */
  leaderName: string;
  /** @description  @example  "우상욱" */
  memberName: string;
  /** @description  @example  "MALE" */
  sex: tSex;
  /** @description  @example  1 */
  teamId: number;
  /** @description  @example  1 */
  teamMemberId: number;
};

export type tTermNewFamily = {
  /** @description 새가족 리더  @example "" */
  firstPlantLeaderName: string;
  /** @description 라인아웃 날짜  @example "2023-08-13" */
  lineoutDate: string;
  /** @description 라인업 날짜 (등반일) @example "2023-08-13" */
  lineupDate: string;
  /** @description 텀 리더 @example "이승현" */
  newTeamLeaderName: string;
  /** @description 방문일  @example "2023-08-13" */
  visitDate: string;
  leaderName: string;
  userId?: number;
} & Pick<
  tAccount,
  | "teamId"
  | "birth"
  | "grade"
  | "isActive"
  | "name"
  | "phoneNumber"
  | "sex"
  | "etc"
>;
