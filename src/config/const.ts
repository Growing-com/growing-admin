type tStatusName = {
  [key: string]: {
    name: string;
    color: string;
  };
};
export const STATUS_NAME: tStatusName = {
  gansa: {
    name: "간사",
    color: "purple"
  },
  codi: {
    name: "코디",
    color: "red"
  },
  leader: {
    name: "리더",
    color: "blue"
  },
  member: {
    name: "조원",
    color: "green"
  },
  new_com: {
    name: "새가족",
    color: "gold"
  }
};
type tRoleName = {
  [key: string]: string;
  codi: string;
  manager: string;
};
export const ROLE_NAME: tRoleName = {
  codi: "코디",
  manager: "관리자"
};

export const STATUS_OPTIONS = [
  { label: "리더", value: "leader" },
  { label: "코디", value: "cordi" },
  { label: "새가족", value: "new_com" },
  { label: "조원", value: "normal" }
];

export const GENDER_OPTIONS = [
  { label: "남", value: "M" },
  { label: "여", value: "W" }
];
