import {
    BankOutlined,
    CheckOutlined,
    SearchOutlined,
    TeamOutlined
} from "@ant-design/icons";

export type tDepartmentMainMenu = {
  key: "search" | "management" | "attendance" | "training";
  label: "전체 검색" | "관리" | "출석" | "훈련";
  children?:
    | tDepartmentManagementSubMenu[]
    | tDepartmentAttendanceSubMenu[]
    | tDepartmentTrainingSubMenu[];
  icon?: React.ReactNode;
};

type tDepartmentManagementSubMenu = {
  key: "management-account" | "management-newfamily" | "management-lineup";
  label: "계정 관리" | "새가족 관리" | "라인업 관리";
  path: string;
};

type tDepartmentAttendanceSubMenu = {
  key: "attendance-management" | "attendance-check" | "attendance-statistics";
  label: "출석 체크" | "출석 통계" | "출석 열람";
  path: string;
};

type tDepartmentTrainingSubMenu = {
  key: "training-roster";
  label: "명부 관리";
  path: string;
};

export const DEPARTMENT_MANAGEMENT_SUB_MENU: tDepartmentManagementSubMenu[] = [
  {
    key: "management-account",
    label: "계정 관리",
    path: "management/account"
  },
  {
    key: "management-newfamily",
    label: "새가족 관리",
    path: "management/newfamily"
  }
  // TODO: 라인업 관리 추후 추가
  // {
  //   key: "management-lineup",
  //   label: "라인업 관리",
  //   path: "management/lineup"
  // }
];

const DEPARTMENT_ATTENDANCE_SUB_MENU: tDepartmentAttendanceSubMenu[] = [
  {
    key: "attendance-check",
    label: "출석 체크",
    path: "attendance/check"
  },
  {
    key: "attendance-statistics",
    label: "출석 통계",
    path: "attendance/statistics"
  },
  {
    key: "attendance-management",
    label: "출석 열람",
    path: "attendance/management"
  }
];

const DEPARTMENT_TRAINING_SUB_MENU: tDepartmentTrainingSubMenu[] = [
  {
    key: "training-roster",
    label: "명부 관리",
    path: "training/roster"
  }
];

export const DEPARTMENT_MAIN_MENU: tDepartmentMainMenu[] = [
  {
    key: "management",
    label: "관리",
    children: DEPARTMENT_MANAGEMENT_SUB_MENU,
    icon: <TeamOutlined  style={{ fontSize: "1.3rem" }} />
  },
  {
    key: "training",
    label: "훈련",
    children: DEPARTMENT_TRAINING_SUB_MENU,
    icon: <BankOutlined  style={{ fontSize: "1.3rem" }} />
  },
  {
    key: "attendance",
    label: "출석",
    children: DEPARTMENT_ATTENDANCE_SUB_MENU,
    icon: <CheckOutlined  style={{ fontSize: "1.3rem" }} />
  },
  {
    key: "search",
    label: "전체 검색",
    icon: <SearchOutlined  style={{ fontSize: "1.3rem" }} />
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
    value: ["search", "attendance"]
  },
  {
    key: "ADMIN",
    value: ["search", "training", "management", "attendance"]
  }
];
