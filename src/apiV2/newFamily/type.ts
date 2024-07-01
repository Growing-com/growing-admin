import { BELIEVE_STATUS, VISIT_REASON } from "common/enum";

// TODO: 추후 v2 는 모두 지워지고 하나의 type 으로 이동해야 한다.
export type tNewFamilyEtcV2 = {
  /** example: "서울대학교 감자학과 6학년"; */
  school: string;

  /** example: false; */
  isFirstChurch: boolean;

  /** example: "박똘똘"; */
  introducer: string;

  /** "온누리교회" */
  latestChurch: string;

  /** example: "아는 사람 소개로"; */
  visitReason: VISIT_REASON;

  /** */
  relationshipWithJesus: BELIEVE_STATUS;

  /** 나는 에수님을 () */
  hasCertaintityOfSalvation: boolean;

  comment: string;
};

export type tNewFamilyV2 = {
  /** @description 이름  @example: "홍길동" */
  name: string;

  /** @description 전화 번호  @example: "010-1234-5678" */
  phoneNumber: string;

  /** @description 생년 월일  @example: "2000-10-16" */
  birth: string;

  /** @description 성별  @example: "MALE" */
  sex: string;

  /** @description 학년  @example: 9 */
  grade: string;

  /** @description 방문일 @example: "2024-06-01" */
  visitDate: string;

  /** @description 기타  @example: tNewFamilyEtc_v2 */
  etc: tNewFamilyEtcV2;
};
