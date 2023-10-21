export const SEX_NAME: { [key: string]: string } = {
  MALE: "남",
  FEMALE: "여"
};

export const ATTENDANCE_STATUS = [
  { label: "출석", value: "ATTEND" },
  { label: "결석", value: "ABSENT" },
  { label: "온라인", value: "ONLINE" }
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
  { value: "매니저", key: "MANAGER" },
  { value: "조원", key: "NORMAL" }
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
