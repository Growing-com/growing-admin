import {
  ArchiveIcon,
  AttendanceIcon,
  DiscipleshipIcon,
  LineOutIcon,
  LineUpIcon,
  NewfamilyWhiteIcon,
  PersonalDataIcon
} from "./icon";

export type tDepartmentMainMenu = {
  key:
    | "newfamily"
    | "personalData"
    | "attendance"
    | "lineOut"
    | "lineUp"
    | "archive"
    | "discipleship";
  title:
    | "새가족 관리"
    | "인적사항"
    | "출석관리"
    | "라인인 & 아웃"
    | "라인업"
    | "아카이브"
    | "훈련사항";
  icon?: React.ReactNode;
};

const iconStyle = {
  transform: "translate(-10px,-16px)"
};

export const DEPARTMENT_MAIN_MENU: tDepartmentMainMenu[] = [
  {
    key: "newfamily",
    title: "새가족 관리",
    icon: <NewfamilyWhiteIcon style={iconStyle} />
  },
  {
    key: "personalData",
    title: "인적사항",
    icon: <PersonalDataIcon style={iconStyle} />
  },
  {
    key: "attendance",
    title: "출석관리",
    icon: <AttendanceIcon style={{ transform: "translate(-10px,-18px)" }} />
  },
  {
    key: "lineOut",
    title: "라인인 & 아웃",
    icon: <LineOutIcon style={{ transform: "translate(-10px,-18px)" }} />
  },
  {
    key: "lineUp",
    title: "라인업",
    icon: <LineUpIcon style={{ transform: "translate(-10px,-18px)" }} />
  },
  {
    key: "discipleship",
    title: "훈련사항",
    icon: <DiscipleshipIcon style={{ transform: "translate(-7px,-16px)" }} />
  },
  {
    key: "archive",
    title: "아카이브",
    icon: <ArchiveIcon style={{ transform: "translate(-10px,-18px)" }} />
  }
];

// 큰 메뉴
export const TAB_MENU = [
  {
    key: "department",
    children: DEPARTMENT_MAIN_MENU
  }
];

export const DUTY_MENU = [
  {
    key: "MANAGER",
    value: ["personalData", "attendance", "archive"]
  },
  {
    key: "ADMIN",
    value: [
      "newfamily",
      "personalData",
      "attendance",
      "lineOut",
      "lineUp",
      "archive",
      "discipleship"
    ]
  }
];
