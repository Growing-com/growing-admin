import { Nullable } from "common/type-aliases";

// TODO: 추후 v2 는 모두 지워지고 하나의 type 으로 이동해야 한다.
export type tNewFamilyEtcV2 = {
  /** example: "서울대학교 감자학과 6학년"; */
  school: string;

  /** example: "이 친구는 짜장면을 좋아합니다"; */
  comment: string;

  /** example: "박똘똘"; */
  introducer: string;

  /** example: "아는 사람 소개로"; */
  visitReason: string;

  /** example: "온누리교회"; */
  latestChurch: string;

  /** example: false; */
  isFirstChurch: boolean;

  /** example: "잘 모른다"; */
  relationshipWithJesus: string;

  /** example: false; */
  hasCertaintityOfSalvation: boolean;
};

export type tNewFamilyV2 = {
  /** @description 새가족 id  @example: 2 */
  newFamilyId: string;

  /** @description 이름  @example: "홍길동" */
  name: string;

  /** @description 전화 번호  @example: "010-1234-5678" */
  phoneNumber: string;

  /** @description 생년 월일  @example: "2000-10-16" */
  birth: string;

  /** @description 성별  @example: "MALE" */
  gender: string;

  /** @description 학년  @example: 9 */
  grade: string;

  /** @description 방문일 @example: "2024-06-01" */
  visitDate: string;

  /** @description 기타  @example: tNewFamilyEtc_v2 */
  etc: tNewFamilyEtcV2;

  /** @description  @example: null */
  newFamilyGroupLeaderName: Nullable<string>;

  /** @description 일반순장이름  @example: 홍길동 */
  smallGroupLeaderName: string;

  /** @description 등반한 순모임 순장 이름  @example: 홍길동 */
  promotedSmallGroupLeaderName: string;

  /** @description 등반일 @example: "2024-06-05" */
  promoteDate: string;
};
