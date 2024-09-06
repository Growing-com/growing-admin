export type tDepartmentMainMenu = {
  key:
    | "personalData"
    | "attendance"
    | "lineOut"
    | "lineUp"
    | "archive"
    | "discipleship";
  label:
    | "인적사항"
    | "출석관리"
    | "라인 인 아웃"
    | "라인업"
    | "아카이브"
    | "훈련 사항";
  children?:
    | tDepartmentPersonalDataSubMenu[]
    | tDepartmentAttendanceSubMenu[]
    | tDepartmentLineOutSubMenu[]
    | tDepartmentLineUpSubMenu[]
    | tDepartmentArchiveSubMenu[]
    | tDepartmentDiscipleshipSubMenu[]
    ;
  icon?: React.ReactNode;
};

type tDepartmentPersonalDataSubMenu = {
  key: "personalData-management";
  label: "인적 사항";
  path: string;
};

type tDepartmentAttendanceSubMenu = {
  key: "attendance-management";
  label: "출석 관리";
  path: string;
};

type tDepartmentLineOutSubMenu = {
  key: "lineOut-management";
  label: "라인아웃 관리";
  path: string;
};

type tDepartmentLineUpSubMenu = {
  key: "lineUp-management";
  label: "라인업 관리";
  path: string;
};

type tDepartmentArchiveSubMenu = {
  key: "archive-management";
  label: "사역 관리";
  path: string;
};

type tDepartmentDiscipleshipSubMenu = {
  key: "discipleship-management";
  label: "훈련 관리";
  path: string;
};

const DEPARTMENT_PERSONALDATE_SUB_MENU: tDepartmentPersonalDataSubMenu[] =
  [
    {
      key: "personalData-management",
      label: "인적 사항",
      path: "personalData/management"
    }
  ];

const DEPARTMENT_ATTENDANCE_SUB_MENU: tDepartmentAttendanceSubMenu[] = [
  {
    key: "attendance-management",
    label: "출석 관리",
    path: "attendance/management"
  }
];

const DEPARTMENT_LINEOUT_SUB_MENU: tDepartmentLineOutSubMenu[] = [
  {
    key: "lineOut-management",
    label: "라인아웃 관리",
    path: "lineOut/management"
  }
];

const DEPARTMENT_LINEUP_SUB_MENU: tDepartmentLineUpSubMenu[] = [
  {
    key: "lineUp-management",
    label: "라인업 관리",
    path: "lineUp/management"
  }
];

const DEPARTMENT_ARCHIVE_SUB_MENU: tDepartmentArchiveSubMenu[] = [
  {
    key: "archive-management",
    label: "사역 관리",
    path: "archive/management"
  }
];

const DEPARTMENT_DISCIPLESHIP_SUB_MENU: tDepartmentDiscipleshipSubMenu[] = [
  {
    key: "discipleship-management",
    label: "훈련 관리",
    path: "discipleship/management"
  }
];

export const DEPARTMENT_MAIN_MENU: tDepartmentMainMenu[] = [
  {
    key: "personalData",
    label: "인적사항",
    // children: DEPARTMENT_PERSONALDATE_SUB_MENU
  },
  {
    key: "attendance",
    label: "출석관리",
    // children: DEPARTMENT_ATTENDANCE_SUB_MENU
  },
  {
    key: "lineOut",
    label: "라인 인 아웃",
    // children: DEPARTMENT_LINEOUT_SUB_MENU
  },
  {
    key: "lineUp",
    label: "라인업",
    // children: DEPARTMENT_LINEUP_SUB_MENU
  },
  {
    key: "archive",
    label: "아카이브",
    // children:DEPARTMENT_ARCHIVE_SUB_MENU
  },
  {
    key: "discipleship",
    label: "훈련 사항",
    // children: DEPARTMENT_DISCIPLESHIP_SUB_MENU
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
      "personalData",
      "attendance",
      "lineOut",
      "lineUp",
      "archive",
      "discipleship"
    ]
  }
];
