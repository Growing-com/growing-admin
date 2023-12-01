import { CheckOutlined, TeamOutlined } from "@ant-design/icons";

export type tDepartmentMainMenu = {
  key: "management" | "attendance";
  label: "관리" | "출석";
  children: tDepartmentManagementSubMenu[] | tDepartmentAttendanceSubMenu[];
  icon?: React.ReactNode;
};

type tDepartmentAttendanceSubMenu = {
  key: "attendance-management" | "attendance-check" | "attendance-statistics";
  label: "출석 체크" | "출석 통계" | "출석 열람";
  path: string;
};

type tDepartmentManagementSubMenu = {
  key: "management-account" | "management-newfamily";
  label: "계정 관리" | "새가족 관리";
  path: string;
};

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
];

export const DEPARTMENT_MAIN_MENU: tDepartmentMainMenu[] = [
  {
    key: "management",
    label: "관리",
    children: DEPARTMENT_MANAGEMENT_SUB_MENU,
    icon: <TeamOutlined rev={undefined} />
  },
  {
    key: "attendance",
    label: "출석",
    children: DEPARTMENT_ATTENDANCE_SUB_MENU,
    icon: <CheckOutlined rev={undefined} />
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
    value: ["attendance"]
  },
  {
    key: "ADMIN",
    value: ["management", "attendance"]
  }
];
