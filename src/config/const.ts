// import { tTeamType } from "apiV1_prefix/term/types";
import { BELIEVE_STATUS, DISPATCH_STATUS, VISIT_REASON } from "common/enum";
import { Color } from "styles/colors";

export const SEX_NAME: { [key: string]: string } = {
  MALE: "남",
  FEMALE: "여"
};

export const ATTENDANCE_CHECK_STATUS = [
  { label: "출석", value: "ATTEND", color: "#87d068" },
  { label: "결석", value: "ABSENT", color: Color.red100 },
  { label: "온라인", value: "ONLINE", color: "#ffd400" }
];

export const ATTENDANCE_STATUS = [
  ...ATTENDANCE_CHECK_STATUS,
  { label: "미체크", value: "NONE", color: "#ccc" }
];

export const DUTY: { [key: string]: string } = {
  PASTOR: "교역자",
  GANSA: "간사",
  CODY: "코디",
  SMALL_GROUP_LEADER: "순장",
  NEW_FAMILY_GROUP_LEADER: "새가족 순장",
  SMALL_GROUP_MEMBER: "순원",
  NEW_FAMILY_MEMBER: "새가족 순원",
  NEW_FAMILY: "새가족",
  NOT_PLACED: "미배정"
};

export const GROUP_TYPE: { [key: string]: string } = {
  SMALL_GROUP: "일반",
  NEW_FAMILY_GROUP: "새가족"
};

export const DISPATCH_TYPE: { [key: string]: string } = {
  MILITARY: "군대",
  ABROAD: "유학",
  MISSIONARY: "선교",
  ETC: "기타"
};

export const DISPATCH_TYPE_OPTIONS = [
  {
    label: "군대",
    value: DISPATCH_STATUS.MILITARY
  },
  {
    label: "유학",
    value: DISPATCH_STATUS.ABROAD
  },
  { label: "선교", value: DISPATCH_STATUS.MISSIONARY },
  {
    label: "기타",
    value: DISPATCH_STATUS.ETC
  }
];

export const DUTY_TAG = [
  {
    key: "PASTOR",
    value: "교역자",
    color: "purple"
  },
  {
    key: "GANSA",
    value: "간사",
    color: "purple"
  },
  {
    key: "CODY",
    value: "코디",
    color: "red"
  },
  {
    key: "SMALL_GROUP_LEADER",
    value: "순장",
    color: "blue"
  },
  {
    key: "NEW_FAMILY_GROUP_LEADER",
    value: "새가족 순장",
    color: "blue"
  },
  {
    key: "SMALL_GROUP_MEMBER",
    value: "조원",
    color: "green"
  },
  {
    key: "NEW_FAMILY_MEMBER",
    value: "새가족 순원",
    color: "orange"
  },
  {
    key: "NEW_FAMILY",
    value: "새가족",
    color: "gold"
  },
  {
    key: "NOT_PLACED",
    value: "미배정",
    color: "grey"
  }
];

export const ROLE = [
  { value: "관리자", key: "ADMIN" },
  { value: "코디", key: "MANAGER" }
  // { value: "조원", key: "NORMAL" }
];

// export const STATUS_OPTIONS = [
//   { label: "리더", value: "leader" },
//   { label: "코디", value: "cordi" },
//   { label: "새가족", value: "new_com" },
//   { label: "조원", value: "normal" }
// ];

export const SEX_OPTIONS = [
  { label: "남자", value: "MALE" },
  { label: "여자", value: "FEMALE" }
];

export const YES_NO_OPTIONS = [
  { label: "예", value: "YES" },
  { label: "아니오", value: "NO" }
];

export const THERE_OPTIONS = [
  { label: "있다", value: "YES" },
  { label: "없다.", value: "NO" }
];

// export const TeamType: Record<tTeamType, tTeamType> = {
//   /** @description 등불 */
//   LAMP: "LAMP",
//   /** @description 나무모임 */
//   TREE: "TREE",
//   /** @description 순모임 */
//   PLANT: "PLANT",
//   /** @description 새가족 */
//   NEW: "NEW"
// };

export const MONTHS_OPTIONS = [
  { label: "1월", value: "1" },
  { label: "2월", value: "2" },
  { label: "3월", value: "3" },
  { label: "4월", value: "4" },
  { label: "5월", value: "5" },
  { label: "6월", value: "6" },
  { label: "7월", value: "7" },
  { label: "8월", value: "8" },
  { label: "9월", value: "9" },
  { label: "10월", value: "10" },
  { label: "11월", value: "11" },
  { label: "12월", value: "12" }
];

const EMPTY_OPTIONS = [
  {
    label: "비어 있음",
    value: ""
  }
];

export const DISCIPLE_SCHOOL_OPTIONS = [
  ...EMPTY_OPTIONS,
  {
    label: "제자 학교 A",
    value: "DISCIPLE_SCHOOL_A"
  },
  {
    label: "제자 학교 B",
    value: "DISCIPLE_SCHOOL_B"
  }
];

export const DISCIPLE_OPTIONS = [
  ...EMPTY_OPTIONS,
  {
    label: "제자 훈련",
    value: "DISCIPLE"
  }
];

export const BAPTISM_OPTIONS = [
  ...EMPTY_OPTIONS,
  { label: "유아 세례", value: "INFANT_BAPTISM" },
  { label: "성인 세례", value: "NORMAL_BAPTISM" },
  { label: "군대 세례", value: "MILITARY_BAPTISM" }
];

export const CONFIRMATION_OPTIONS = [
  ...EMPTY_OPTIONS,
  { label: "입교", value: "CONFIRMATION" }
];

export const PRE_BAPTISM_OPTIONS = [
  ...EMPTY_OPTIONS,
  { label: "학습", value: "PRE_BAPTISM" }
];

export const VISIT_REASON_OPTIONS = [
  { label: "훈련 받고 싶어서", value: VISIT_REASON.DISCIPLE_TRAINING },
  { label: "아는 사람 소개", value: VISIT_REASON.INTRODUCE },
  {
    label: "종교를 가져야 겠다는 생각에",
    value: VISIT_REASON.RELIGION
  },
  {
    label: "대학부 새생명축제(전도집회)를 계기로",
    value: VISIT_REASON.NEW_LIFE_FESTIVAL
  },
  { label: "기타", value: VISIT_REASON.ETC }
];

export const BELIEVE_STATUS_OPTIONS = [
  {
    label: "나를 구원해 주신 주님으로 믿고 있다.",
    value: BELIEVE_STATUS.LORD
  },
  {
    label: "믿고 싶지만 어떻게 해야 할지 모르겠다.",
    value: BELIEVE_STATUS.HESITANT
  },
  { label: "잘 모른다.", value: BELIEVE_STATUS.NONE },
  {
    label: "알고 싶지도 않고 관심도 없다.",
    value: BELIEVE_STATUS.NOT_INTERESTED
  }
];
