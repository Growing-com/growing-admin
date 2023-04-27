const Routes = [];

// 서브 메뉴
export const MANAGEMENT_SUB_MENU = [
  {
    key: "management-account",
    label: "계정 관리",
    path: "management/account"
  },
]

// 중간 메뉴
export const DEPARTMENT_MAIN_MENU = [
  {
    key: "management",
    label: "부서 관리",
    children : MANAGEMENT_SUB_MENU
  },
  {
    key: "attendance",
    label: "출석 관리",
    children : [
      {
        key: "attendance-check",
        label: "출석 체크",
        path:"attendance/check",
      },
      {
        key: "attendance-statistics",
        label: "출석 통계",
        path:"attendance/statistics",
      },
    ],
  },
];

// 큰 메뉴
const TAB_MENU = {
  department: {
    key: "department",
    menus: DEPARTMENT_MAIN_MENU,
  },
};