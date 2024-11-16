import { tSex, tUser } from "api/account/types";

export type tTerm = {
  termId: number;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
};

export type tSmallGroup = {
  smallGroupId: number;
  codyName: string;
  leaderName: string;
  sex: tSex;
  grade: number;
};

export type tNewFamilyGroup = {
  newFamilyGroupId: number;
  newFamilyGroupLeaderName: string;
  sex: tSex;
  grade: number;
};

export type tNewfamilyLineUpSmallGroup = {
  codyName: string;
  smallGroupId: number;
  smallGroupLeaderName: string;
};

export type tCodyAndSmallGroup = {
  codyName: string;
  smallGroupLeaders: tNewfamilyLineUpSmallGroup[];
};

export type tLeader = tUser & {
  /** @description 코디 이름  @example  "장준혁" */
  codyName?: string;
};

export type tCody = {
  codyId: number;
  codyName: string;
  sex: tSex;
  grade: number;
};

export type tPastor = {
  pastorId: number;
  pastorName: string;
  isSenior: boolean;
};

type tGroupType = "SMALL_GROUP" | "NEW_FAMILY_GROUP";

export type tGroup = {
  groupId: number;
  leaderName: string;
  groupType: tGroupType;
  sex: tSex;
  grade: number;
};
