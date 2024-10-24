import { tUser } from "api/account/types";

export type tTerm = {
  termId: number;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
};

export type tGetNewFamilyGroup = {
  newFamilyGroupId: number;
  newFamilyGroupLeaderName: string;
};

export type tSmallGroupLeader = {
  codyName: string;
  smallGroupId: number;
  smallGroupLeaderName: string;
};

export type tSmallGroup = {
  codyName: string;
  smallGroupLeaders: tSmallGroupLeader[];
};

export type tLeader = tUser & {
  /** @description 코디 이름  @example  "장준혁" */
  codyName?: string;
};

export type tCody = {
  codyId: number;
  codyName: string;
};

type tGroupType = "SMALL_GROUP" | "NEW_FAMILY_GROUP";

export type tGroup = {
  groupId: number;
  leaderName: string;
  groupType: tGroupType;
};
