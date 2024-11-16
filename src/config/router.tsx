import {
  ApartmentOutlined,
  HeartOutlined,
  SearchOutlined,
  TeamOutlined,
  UsergroupAddOutlined
} from "@ant-design/icons";

export type tDepartmentMainMenu = {
  key: "management" | "newfamily" | "lineup" | "leaders" | "search";
  label: "관리" | "새가족" | "라인업" | "리더 구성원" | "전체 검색";
  children?:
    | tDepartmentManagementSubMenu[]
    | tDepartmentNewfamilySubMenu[]
    | tDepartmentLineUpSubMenu[];
  // | tDepartmentAttendanceSubMenu[]
  icon?: React.ReactNode;
};

type tDepartmentManagementSubMenu = {
  key: "management-user";
  label: "지체 관리";
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
  key: "lineup-newfamily" | "lineup-edit";
  label: "새가족 라인업" | "라인업 수정";
  path: string;
};

export const DEPARTMENT_MANAGEMENT_SUB_MENU: tDepartmentManagementSubMenu[] = [
  {
    key: "management-user",
    label: "지체 관리",
    path: "management/user"
  }
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
  },
  {
    key: "lineup-edit",
    label: "라인업 수정",
    path: "lineup/edit"
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
  {
    key: "management",
    label: "관리",
    children: DEPARTMENT_MANAGEMENT_SUB_MENU,
    icon: <TeamOutlined style={{ fontSize: "1.3rem" }} />
  },
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
    label: "리더 구성원",
    icon: <ApartmentOutlined style={{ fontSize: "1.3rem" }} />
  },
  {
    key: "search",
    label: "전체 검색",
    icon: <SearchOutlined style={{ fontSize: "1.3rem" }} />
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
    value: ["management", "newfamily", "lineup", "leaders", "search"]
  },
  {
    key: "NEW_FAMILY_GANSA",
    value: ["management", "newfamily", "leaders", "search"]
  },
  {
    key: "LINE_UP_GANSA",
    value: ["management", "newfamily", "lineup", "leaders", "search"]
  }
];
