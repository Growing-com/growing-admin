/**
 * @descriptio 성
 * MALE : 남
 * FEMALE : 여
 */
export type tSex = "MALE" | "FEMALE";

/**
 * * @descriptio 직분
 * PASTOR: 교역자,
 * GANSA: 간사,
 * CODY: 코디,
 * SMALL_GROUP_LEADER: 순장,
 * NEW_FAMILY_GROUP_LEADER: 새가족 순장,
 * SMALL_GROUP_MEMBER: 순원,
 * NEW_FAMILY_MEMBER: 새가족 순원,
 * NEW_FAMILY: 새가족,
 * NOT_PLACED: 미배정
 */
export type tDuty =
  | "PASTOR"
  | "GANSA"
  | "CODY"
  | "SMALL_GROUP_LEADER"
  | "NEW_FAMILY_GROUP_LEADER"
  | "SMALL_GROUP_MEMBER"
  | "NEW_FAMILY_MEMBER"
  | "NEW_FAMILY"
  | "NOT_PLACED";

/**
 * @description 역할
 * ADMIN: 관리자
 * MANAGER: 매니저
 * NORMAL: 조원
 */
export type tRole = "ADMIN" | "MANAGER" | "NORMAL";

export type tUser = {
  /** @description 유저 아이디 @example 1 */
  userId: number;
  /** @description 이름  @example   "윤동건" */
  name: string;
  /** @description 성 @example   "MALE" */
  sex: tSex;
  /** @description 학년  @example  9 */
  grade: number;
  /** @description 휴대폰 번호  @example  "01011111111" */
  phoneNumber: string;
  /** @description 생년월일  @example  "1996-10-16" */
  birth?: string;
  /** @description 직분 이름  @example  "CODY" */
  duty?: string;
  /** @description 리더 이름  @example  "황길동" */
  leaderName?: string;
  /** @description 순모임 아이디  @example  1 */
  smallGroupId?: number;
  // updatedBy: string;
  // updatedAt: string;
};

export type tLoginParam = {
  username: string;
  password: string;
};

export type tUserAccount = {
  /** @description 유저 아이디 @example 1 */
  userId: number;
  /** 직분 */
  // duty: tDuty;
  /** 역할 */
  role: tRole;
  /** @description 이름  @example   "윤동건", */
  name: string;
};

export type tDutyCount = {
  totalCount: number;
  pastorCount: number;
  codyCount: number;
  smallGroupLeaderCount: number;
  newFamilyGroupLeaderCount: number;
  smallGroupMemberCount: number;
  newFamilyMemberCount: number;
  newFamilyCount: number;
  notPlacedCount: number;
};
