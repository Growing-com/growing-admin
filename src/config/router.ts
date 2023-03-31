const Routes = [];

const TAB_MENU = {
  department: {
    key: "department",
    menus: DEPARTMENT_MAIN_MENU,
  },
};

const DEPARTMENT_MAIN_MENU = [
  {
    key: "management",
    name: "부서 관리",
    menu: [
      {
        key: "management-account",
        name: "계정 관리",
      },
    ],
  },
  {
    key: "attendance",
    name: "출석 관리",
    menu: [
      {
        key: "attendance-check",
        name: "출석 체크",
      },
      {
        key: "attendance-statistics",
        name: "출석 통계",
      },
    ],
  },
];
