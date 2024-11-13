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

export type tCreateSmallGroup = {
  termId: number;
  codyId: number;
  leaderUserId: number;
  memberUserIds: number[];
};

export type tUpdateSmallGroup = {
  smallGroupId: number;
  memberUserIds: number[];
};
