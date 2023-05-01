const Routes = [];

type tDepartmentMainMenu = {
  key: 'management' | 'attendance',
  label: '부서 관리' | '출석 관리',
  children: tDepartmentAttendanceSubMenu[] & tDepartmentManagementSubMenu[],
}

type tDepartmentAttendanceSubMenu = {
  key: 'attendance-check' | 'attendance-statistics',
  label: '출석 체크' | '출석 통계',
  path: string
}

type tDepartmentManagementSubMenu = {
  key: 'management-account',
  label: '계정 관리',
  path: string
}

const DEPARTMENT_ATTENDANCE_SUB_MENU: tDepartmentAttendanceSubMenu[] = [
  {
    key: "attendance-check",
    label: "출석 체크",
    path: "attendance/check",
  },
  {
    key: "attendance-statistics",
    label: "출석 통계",
    path: "attendance/statistics",
  }
]

export const DEPARTMENT_MANAGEMENT_SUB_MENU :tDepartmentManagementSubMenu[] = [
  {
    key: "management-account",
    label: "계정 관리",
    path: "management/account",
  }
]

export const DEPARTMENT_MAIN_MENU: tDepartmentMainMenu[] = [
  {
    key: "management",
    label: "부서 관리",
    children : DEPARTMENT_MANAGEMENT_SUB_MENU
  },
  {
    key: "attendance",
    label: "출석 관리",
    children : DEPARTMENT_ATTENDANCE_SUB_MENU
  },
];

// 큰 메뉴
const TAB_MENU = {
  department: {
    key: "department",
    menus: DEPARTMENT_MAIN_MENU,
  },
};