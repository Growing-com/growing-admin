import GRAlert from "@component/atom/alert/GRAlert";
import {
  tAttendanceCheckListItem,
  tStatisticsCheckListItem
} from "api/attendance/types";
import { ATTENDANCE_STATUS, SEX_OPTIONS } from "config/const";
import { isArray, isUndefined } from "lodash";
import ExportExcelOfJson from "modules/excel/ExportExcelOfJson";

export type tStatisticsName = "leader" | "manager" | "attendance" | "grade";

export const useStatisticsDataToExcel = () => {
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
        ...(newAttend.userName && { userName: newAttend.userName }),
        grade: newAttend.grade,
        phoneNumber: newAttend.phoneNumber,
        sex: SEX_OPTIONS.find(gender => gender)?.label,
        ..._date
      };
    });
  };

  const convertStatisticsDataToExcelData = (
    attendData: tStatisticsCheckListItem[]
  ) => {
    return attendData.map(attend => {
      const { attendanceItems, ...attendInfo } = attend;

      let _totalRegistered = 0;
      const _date = attendanceItems.reduce((acc: any, item) => {
        _totalRegistered = item.totalRegistered;
        acc[item.week] = item?.totalAttendance;
        return acc;
      }, {});
      return {
        ...(!isUndefined(attendInfo?.managerName) && {
          managerName: attendInfo.managerName
        }),
        ...(!isUndefined(attendInfo?.grade) && { grade: attendInfo.grade }),
        totalRegistered: _totalRegistered,
        ..._date
      };
    });
  };

  const handleStatisticsDataToExcel = async (
    fileName: string,
    statisticsName: tStatisticsName,
    _attendData: any[]
  ) => {
    if (!_attendData?.length || !isArray(_attendData)) {
      return GRAlert.error("엑셀로 변환할 출석 데이터가 없습니다");
    }
    let rowData = [];
    let headerTitle = [];

    /** @description headerTitle 데이터의 순서에 따라서 들어가기 때문에 헤더 순서가 중요 하다  */
    switch (statisticsName) {
      case "attendance": // 출결
        rowData = convertAttendanceDataToExcelData(_attendData);
        headerTitle = ["나무", "순장", "이름", "학년", "전화번호", "성별"];
        break;
      case "leader": // 순모임 별
        rowData = convertAttendanceDataToExcelData(_attendData);
        headerTitle = ["나무", "순장", "학년", "전화번호", "성별"];
        break;
      case "manager": // 나무 별
        rowData = convertStatisticsDataToExcelData(_attendData);
        headerTitle = ["나무", "재적"];
        break;
      case "grade": // 학년 별
        rowData = convertStatisticsDataToExcelData(_attendData);
        headerTitle = ["학년", "재적"];
        break;
    }

    return await ExportExcelOfJson({
      fileName,
      headerTitle,
      data: rowData
    });
  };

  return [handleStatisticsDataToExcel];
};
