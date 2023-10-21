export const SEX_NAME: { [key: string]: string } = {
  MALE: "남",
  FEMALE: "여"
};

export const ATTENDANCE_STATUS = [
  { label: "출석", value: "ATTEND" },
  { label: "결석", value: "ABSENT" },
  { label: "온라인", value: "ONLINE" }
];

export const DUTY_NAME = [
  {
    value: "PASTOR",
    name: "교역자",
    color: "purple"
  },
  {
    value: "GANSA",
    name: "간사",
    color: "purple"
  },
  {
    value: "CODY",
    name: "코디",
    color: "red"
  },
  {
    value: "LEADER",
    name: "리더",
    color: "blue"
  },
  {
    value: "MEMBER",
    name: "조원",
    color: "green"
  },
  {
    value: "NEW_COMER",
    name: "새가족",
    color: "gold"
  }
];

export const ROLE_NAME = [
  { label: "관리자", value: "ADMIN" },
  { label: "매니저", value: "MANAGER" },
  { label: "조원", value: "NORMAL" }
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
