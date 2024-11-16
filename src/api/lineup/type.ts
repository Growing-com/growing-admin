import { tUser } from 'api/account/types';

export type tCreatePastor = {
  termId: number;
  pastorUserId: number;
};

export type tChangePastor = {
  termId: number;
  targetSeniorPastorId: number;
};

export type tCreateCody = {
  termId: number;
  codyUserId: number;
};

export type tUpdateCody = {
  codyId: number;
  smallGroupIds: number[];
};

export type tCreateGroup = {
  termId: number;
  codyId: number;
  leaderUserId: number;
  memberUserIds: number[];
};

export type createGroupForm = Omit<tCreateGroup, "termId">;

export type tUpdateSmallGroup = {
  smallGroupId: number;
  memberUserIds: number[];
};

export type tUpdateNewFamilyGroup = {
  newFamilyGroupId: number;
  memberUserIds: number[];
};

export type tGroupMembers = Omit<tUser,"phoneNumber">;