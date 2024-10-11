import { tSex } from "api/account/types";
import { tAttendanceCheckStatus, tAttendanceStatus } from "api/attendance/type";
import { BELIEVE_STATUS, VISIT_REASON, YES_NO_STATUS } from "common/enum";
// import { Nullable } from "common/type-aliases";

export type tNewfamilyEtc = {
  /** @description 학교 @example: "서울대학교 감자학과 6학년"; */
  school: string;

  /** @description 인도자 @example: "박똘똘" */
  introducer: string;

  /** @description 교회가 처음? @example: false */
  isFirstChurch: YES_NO_STATUS;

  /** @description 최근 교회 @example "온누리교회" */
  latestChurch: string;

  /** @description 방문 이유 @example: "아는 사람 소개로" */
  visitReason: VISIT_REASON;

  /** @description 나는 에수님을 () @example: "주로 믿는다" */
  relationshipWithJesus: BELIEVE_STATUS;

  /** @description 나는 구원의 확신이 () @example: "있다"*/
  hasCertaintityOfSalvation: YES_NO_STATUS;

  /** @description 메모 @example: 짜장면을 좋아합니다. */
  comment: string;

  /** @description 새가족 순원 기록지 @example: "낯을 많이 가립니다." */
  lineUpMemo?: string;
};

export type tNewfamily = {
  /** @description 새가족 ID  @example: 1 */
  newFamilyId: number;

  /** @description 이름  @example: "홍길동" */
  name: string;

  /** @description 성별  @example: "MALE" */
  sex: tSex;

  /** @description 전화 번호  @example: "010-1234-5678" */
  phoneNumber: string;

  /** @description 생년 월일  @example: "2000-10-16" */
  birth: string;

  /** @description 방문일 @example: "2024-06-01" */
  visitDate: string;

  /** @description 학년  @example: 9 */
  grade: number;

  /** @description 기타  @example: tNewFamilyEtc_ */
  etc?: tNewfamilyEtc;

  /** @description 새가족 그룹 리더 이름  @example: 고길동 */
  newFamilyGroupLeaderName?: string;

  /** @description 일반 그룹 리더 이름  @example: 고길동 */
  smallGroupLeaderName?: string;

  /** @description 등반 날짜  @example: "2024-07-01" */
  promoteDate?: string;

  /** @description 새가족 그룹 ID  @example: 1 */
  newFamilyGroupId?: number;
};

export type tNewfamilyRequested = tNewfamily & {
  temporarySmallGroupIds?: number[];
  smallGroupId?: number;
  // codyName?: string;
};

export type tNewfamilyPromoted = Omit<
  tNewfamily,
  "birth" | "visitDate" | "etc" | "newFamilyGroupId"
> & {
  /** @description 등반 후 몇 주가 지났는지  @example: 2 */
  weeksAfterPromotion: number;
};

export type tAttendanceItems = {
  /** @description 출결 날짜  @example: “2024-08-08” */
  date: string;
  /** @description 출결 정보  @example: “ABSENT” */
  status: tAttendanceStatus;
  /** @description 출결 이유  @example: "감기 걸림" */
  reason?: string;
};

export type tNewfamilyAttendances = {
  /** @description 새가족 ID  @example: 1 */
  newFamilyId: number;

  /** @description 이름  @example: "홍길동" */
  name: string;

  /** @description 성별  @example: "MALE" */
  sex: tSex;

  /** @description 학년  @example: 9 */
  grade: number;

  /** @description 새가족 그룹 리더 이름  @example: 고길동 */
  newFamilyGroupLeaderName?: string;

  /** @description 총 출석 수  @example: 4 */
  totalAttendCount: number;

  /** @description 총 결석 수  @example: 1 */
  totalAbsentCount: number;

  attendanceItems: tAttendanceItems[];

  attendanceCheckItems?: tAttendanceCheckItems;
};

export type tAttendanceCheckItems = {
  newFamilyId?: number;
  status?: tAttendanceStatus;
  reason?: string;
};

export type tNewfamilyAttendanceCheck = {
  date: string;
  attendanceItems: tAttendanceCheckItems[];
};

export type tLineOutNewFamily = {
  /** @description 라인아웃된 새가족 아이디  @example: 1 */
  lineOutNewFamilyId: number;

  /** @description 이름  @example: "홍길동" */
  name: string;

  /** @description 성별  @example: "MALE" */
  sex: tSex;

  /** @description 생년 월일  @example: "2000-10-16" */
  birth: string;

  /** @description 방문일 @example: "2024-06-01" */
  visitDate: string;

  /** @description 학년  @example: 9 */
  grade: number;

  /** @description 방문일 @example: "2024-06-01" */
  lineOutDate: string;
};
