import GRAlert from "@component/atom/alert/GRAlert";
import { tAttendanceCheckListItem } from "api/attendance/types";
import { ATTENDANCE_STATUS, SEX_OPTIONS } from "config/const";
import { isArray } from "lodash";
import ExportExcelOfJson from "modules/excel/ExportExcelOfJson";

const ATTENDANCE_HEADER = ["나무", "순장", "이름", "학년", "전화번호", "성별"];

export const useAttendanceExcel = () => {
  const convertAttendanceDataToExcelData = (
    attendData: tAttendanceCheckListItem[]
  ) => {
    return attendData.map(attend => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { attendanceItems, managerId, sex, ...newAttend } = attend;

      const _date = attendanceItems.reduce((acc: any, item) => {
        const _status = ATTENDANCE_STATUS.find(
          status => status.value === item.status
        );
        acc[item.week] = _status?.label;
        return acc;
      }, {});

      return {
        managerName: newAttend.managerName,
        leaderName: newAttend.leaderName,
        userName: newAttend.userName,
        grade: newAttend.grade,
        phoneNumber: newAttend.phoneNumber,
        sex: SEX_OPTIONS.find(gender => gender)?.label,
        ..._date
      };
    });
  };

  const handleAttendanceDataToExcel = async (
    fileName: string,
    _attendData: any[]
  ) => {
    if (!_attendData?.length || !isArray(_attendData)) {
      return GRAlert.error("엑셀로 변환할 출석 데이터가 없습니다");
    }
    const rowData = convertAttendanceDataToExcelData(_attendData);
    return await ExportExcelOfJson({
      fileName,
      data: rowData,
      headerTitle: ATTENDANCE_HEADER
    });
  };

  return [handleAttendanceDataToExcel];
};
