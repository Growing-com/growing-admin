const Routes = [];

type tDepartmentMainMenu = {
  key: "management" | "attendance";
  label: "관리" | "출석";
  children: tDepartmentManagementSubMenu[] | tDepartmentAttendanceSubMenu[];
  icon?: React.ReactNode;
};

type tDepartmentAttendanceSubMenu = {
  key: "attendance-management" | "attendance-check" | "attendance-statistics";
  label: "출석 체크" | "출석 통계" | "출석 관리";
  path: string;
};

type tDepartmentManagementSubMenu = {
  key: "management-account";
  label: "계정 관리";
  path: string;
};

const DEPARTMENT_ATTENDANCE_SUB_MENU: tDepartmentAttendanceSubMenu[] = [
  {
    key: "attendance-management",
    label: "출석 관리",
    path: "attendance/management"
  },
  {
    key: "attendance-statistics",
    label: "출석 통계",
    path: "attendance/statistics"
  },
  {
    key: "attendance-check",
    label: "출석 체크",
    path: "attendance/check"
  }
];

export const DEPARTMENT_MANAGEMENT_SUB_MENU: tDepartmentManagementSubMenu[] = [
  {
    key: "management-account",
    label: "계정 관리",
    path: "management/account"
  }
];

export const DEPARTMENT_MAIN_MENU: tDepartmentMainMenu[] = [
  {
    key: "management",
    label: "관리",
    children: DEPARTMENT_MANAGEMENT_SUB_MENU
  },
  {
    key: "attendance",
    label: "출석",
    children: DEPARTMENT_ATTENDANCE_SUB_MENU
  }
];

// 큰 메뉴
const TAB_MENU = {
  department: {
    key: "department",
    menus: DEPARTMENT_MAIN_MENU
  }
};
