//* ATTEND: "출석", ABSENT: "결석", ONLINE: "온라인", NONE: "미완료"*/
export type tAttendanceStatus = "ATTEND" | "ABSENT" | "ONLINE" | "NONE";
export type tAttendanceCheckStatus = Exclude<tAttendanceStatus, "NONE">;