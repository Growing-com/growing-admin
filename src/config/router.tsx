import GRFlexView from "@component/atom/view/GRFlexView";
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
  label:
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
  transform: "translate(0px,0px)",
  fontSize: "1.3rem"
};

export const DEPARTMENT_MAIN_MENU: tDepartmentMainMenu[] = [
  {
    key: "newfamily",
    label: "새가족 관리",
    icon: (
      <GRFlexView marginright={0.5}>
        <NewfamilyWhiteIcon style={iconStyle} />
      </GRFlexView>
    )
  },
  {
    key: "personalData",
    label: "인적사항",
    icon: (
      <GRFlexView marginright={0.5}>
        <PersonalDataIcon style={iconStyle} />
      </GRFlexView>
    )
  },
  {
    key: "attendance",
    label: "출석관리",
    icon: (
      <GRFlexView marginright={0.5}>
        <AttendanceIcon style={iconStyle} />
      </GRFlexView>
    )
  },
  {
    key: "lineOut",
    label: "라인인 & 아웃",
    icon: (
      <GRFlexView marginright={0.5}>
        <LineOutIcon style={iconStyle} />
      </GRFlexView>
    )
  },
  {
    key: "lineUp",
    label: "라인업",
    icon: (
      <GRFlexView marginright={0.5}>
        <LineUpIcon style={iconStyle} />
      </GRFlexView>
    )
  },
  {
    key: "discipleship",
    label: "훈련사항",
    icon: (
      <GRFlexView marginright={0.6}>
        <DiscipleshipIcon style={iconStyle} />
      </GRFlexView>
    )
  },
  {
    key: "archive",
    label: "아카이브",
    icon: (
      <GRFlexView marginright={0.5}>
        <ArchiveIcon style={iconStyle} />
      </GRFlexView>
    )
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
