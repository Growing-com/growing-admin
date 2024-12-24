import { tSex } from "api/account/types";

//* ATTEND: "출석", ABSENT: "결석", ONLINE: "온라인", NONE: "미완료"*/
export type tAttendanceStatus = "ATTEND" | "ABSENT" | "ONLINE" | "NONE";
export type tAttendanceCheckStatus = Exclude<tAttendanceStatus, "NONE">;

export type tAttendanceItem = {
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
  // attendItems: tAttendanceItems[];
  // *[{}] -> {} 로 변경시
  attendanceItem: tAttendanceItem;
};

// attendItems 명칭 통일시 제거
export type tStumpAttendanceCheckData = {
  attendanceItems: tAttendanceItem[];
} & Omit<tAttendanceCheckData, "attendanceItem">;

export type tAttendanceData = {
  attendanceItems: tAttendanceItem[];
} & Omit<tAttendanceCheckData, "attendanceItem">;

export type tUserAttendanceCheckItems = {
  userId: number;
  status: tAttendanceStatus;
  reason?: string;
};

export type tPostStumpAttendance = Omit<tPostGroupUserAttendance, "codyId">;

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

export type tAttendanceRegisterRate = {
  // 유저
  totalActive: number;
  totalRegistered: number;
  // 새가족
  totalNewFamilies: number;
  totalNewFamiliesRegistered: number;
  // 새가족 순장
  totalNewFamilyGroupLeaders: number;
  totalNewFamilyGroupLeadersRegistered: number;
  // 새가족 순원
  totalNewFamilyGroupMembers: number;
  totalNewFamilyGroupMembersRegistered: number;
  // 순장
  totalSmallGroupLeaders: number;
  totalSmallGroupLeadersRegistered: number;
  // 일반 순원
  totalSmallGroupMembers: number;
  totalSmallGroupMembersRegistered: number;
  // 그루터기
  totalStump: number;
  totalStumpRegistered: number;
};
