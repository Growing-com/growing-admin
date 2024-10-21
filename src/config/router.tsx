import { ApartmentOutlined, HeartOutlined, UsergroupAddOutlined } from "@ant-design/icons";

export type tDepartmentMainMenu = {
  key: "management" | "newfamily" | "lineup" | "leaders";
  label: "관리" | "새가족" | "라인업" | "부서 리더 구성원";
  children?:
    | tDepartmentManagementSubMenu[]
    | tDepartmentNewfamilySubMenu[]
    | tDepartmentLineUpSubMenu[];
  // | tDepartmentAttendanceSubMenu[]
  icon?: React.ReactNode;
};

type tDepartmentManagementSubMenu = {
  key: "management-account";
  label: "계정 관리";
  path: string;
};

// type tDepartmentAttendanceSubMenu = {
//   key: "attendance-management" | "attendance-check" | "attendance-statistics";
//   label: "출석 체크" | "출석 통계" | "출석 열람";
//   path: string;
// };

type tDepartmentNewfamilySubMenu = {
  key: "newfamily-management" | "newfamily-attendance";
  label: "새가족 관리" | "새가족 출석";
  path: string;
};

type tDepartmentLineUpSubMenu = {
  key: "lineup-newfamily";
  label: "새가족 라인업";
  path: string;
};

export const DEPARTMENT_MANAGEMENT_SUB_MENU: tDepartmentManagementSubMenu[] = [
  {
    key: "management-account",
    label: "계정 관리",
    path: "management/account"
  }
  // TODO: 라인업 관리 추후 추가
  // {
  //   key: "management-lineup",
  //   label: "라인업 관리",
  //   path: "management/lineup"
  // }
];

export const DEPARTMENT_NEWFAMILY_SUB_MENU: tDepartmentNewfamilySubMenu[] = [
  {
    key: "newfamily-management",
    label: "새가족 관리",
    path: "newfamily/management"
  },
  {
    key: "newfamily-attendance",
    label: "새가족 출석",
    path: "newfamily/attendance"
  }
];

export const DEPARTMENT_LINEUP_SUB_MENU: tDepartmentLineUpSubMenu[] = [
  {
    key: "lineup-newfamily",
    label: "새가족 라인업",
    path: "lineup/newfamily"
  }
];

// const DEPARTMENT_ATTENDANCE_SUB_MENU: tDepartmentAttendanceSubMenu[] = [
//   {
//     key: "attendance-check",
//     label: "출석 체크",
//     path: "attendance/check"
//   },
//   {
//     key: "attendance-statistics",
//     label: "출석 통계",
//     path: "attendance/statistics"
//   },
//   {
//     key: "attendance-management",
//     label: "출석 열람",
//     path: "attendance/management"
//   }
// ];

export const DEPARTMENT_MAIN_MENU: tDepartmentMainMenu[] = [
  // {
  //   key: "management",
  //   label: "관리",
  //   children: DEPARTMENT_MANAGEMENT_SUB_MENU,
  //   icon: <TeamOutlined style={{ fontSize: "1.3rem" }} />
  // },
  {
    key: "newfamily",
    label: "새가족",
    children: DEPARTMENT_NEWFAMILY_SUB_MENU,
    icon: <HeartOutlined style={{ fontSize: "1.3rem" }} />
  },
  {
    key: "lineup",
    label: "라인업",
    children: DEPARTMENT_LINEUP_SUB_MENU,
    icon: <UsergroupAddOutlined style={{ fontSize: "1.3rem" }} />
  },
  {
    key: "leaders",
    label: "부서 리더 구성원",
    icon: <ApartmentOutlined style={{ fontSize: "1.3rem" }} />
  }

  // {
  //   key: "attendance",
  //   label: "출석",
  //   children: DEPARTMENT_ATTENDANCE_SUB_MENU,
  //   icon: <CheckOutlined style={{ fontSize: "1.3rem" }} />
  // },
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
    key: "SUPER_ADMIN",
    value: ["newfamily", "lineup", "leaders"]
  },
  {
    key: "NEW_FAMILY_GANSA",
    value: ["newfamily", "leaders"]
  },
  {
    key: "LINE_UP_GANSA",
    value: ["newfamily", "lineup", "leaders"]
  }
];
