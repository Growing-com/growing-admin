import { tTeamType } from "api/term/types";
import { Color } from "styles/colors";

export const SEX_NAME: { [key: string]: string } = {
  MALE: "남",
  FEMALE: "여"
};

export const ATTENDANCE_STATUS = [
  { label: "출석", value: "ATTEND", color: "#87d068" },
  { label: "결석", value: "ABSENT", color: Color.red100 },
  { label: "온라인", value: "ONLINE", color: "#ffd400" }
];

export const DUTY = [
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
    key: "LEADER",
    value: "리더",
    color: "blue"
  },
  {
    key: "MEMBER",
    value: "조원",
    color: "green"
  },
  {
    key: "NEW_COMER",
    value: "새가족",
    color: "gold"
  }
];

export const ROLE = [
  { value: "관리자", key: "ADMIN" },
  { value: "코디", key: "MANAGER" }
  // { value: "조원", key: "NORMAL" }
];

export const STATUS_OPTIONS = [
  { label: "리더", value: "leader" },
  { label: "코디", value: "cordi" },
  { label: "새가족", value: "new_com" },
  { label: "조원", value: "normal" }
];

export const SEX_OPTIONS = [
  { label: "남", value: "MALE" },
  { label: "여", value: "FEMALE" }
];

export const TeamType: Record<tTeamType, tTeamType> = {
  /** @description 등불 */
  LAMP: "LAMP",
  /** @description 나무모임 */
  TREE: "TREE",
  /** @description 순모임 */
  PLANT: "PLANT",
  /** @description 새가족 */
  NEW: "NEW"
};

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
