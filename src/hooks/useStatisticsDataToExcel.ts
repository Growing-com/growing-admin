import GRAlert from "@component/atom/alert/GRAlert";
import { tAttendanceCheckListItem } from "api/attendance/types";
import { ATTENDANCE_STATUS, SEX_OPTIONS } from "config/const";
import { isArray, isUndefined } from "lodash";
import ExportExcelOfJson from "modules/excel/ExportExcelOfJson";

export type tStatisticsName = "leader" | "manager" | "attendance" | "grade";

export const useStatisticsDataToExcel = () => {
  const filterWeeks = (attendData: tAttendanceCheckListItem[]) => {
    const weeks = [] as string[];
    attendData.forEach(attend => {
      const { attendanceItems } = attend;
      attendanceItems.forEach(item => {
        if (!weeks.includes(item.week)) {
          weeks.push(item.week);
        }
      });
    });
    return weeks;
  };
  const convertAttendanceDataToExcelData = (
    attendData: tAttendanceCheckListItem[]
  ) => {
    const _weeks = filterWeeks(attendData);
    return attendData.map(attend => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { attendanceItems, managerId, sex, ...newAttend } = attend;

      const _date = _weeks.reduce((acc: any, week) => {
        const item = attendanceItems.find(item => item.week === week);
        if (item) {
          const _status = ATTENDANCE_STATUS.find(
            status => status.value === item?.status
          );
          acc[week] = _status?.label;
        } else {
          acc[week] = "";
        }
        return acc;
      }, {});

      return {
        managerName: newAttend.managerName,
        leaderName: newAttend.leaderName,
        ...(newAttend.userName && { userName: newAttend.userName }),
        grade: newAttend.grade,
        phoneNumber: newAttend.phoneNumber,
        sex: SEX_OPTIONS.find(_sex => _sex.value === attend.sex)?.label,
        ..._date
      };
    });
  };

  const convertStatisticsDataToExcelData = (
    attendData: tAttendanceCheckListItem[]
  ) => {
    const _weeks = filterWeeks(attendData);
    return attendData.map(attend => {
      const { attendanceItems, ...attendInfo } = attend;

      const _date = _weeks.reduce((acc: any, week) => {
        const _findOne = attendanceItems.find(item => item.week === week);
        acc[week] = _findOne?.totalAttendance
          ? `${_findOne?.totalAttendance}/${_findOne?.totalRegistered}`
          : "";
        return acc;
      }, {});

      return {
        ...(!isUndefined(attendInfo?.managerName) && {
          managerName: attendInfo.managerName
        }),
        ...(!isUndefined(attendInfo?.leaderName) && {
          leaderName: attendInfo.leaderName
        }),
        ...(!isUndefined(attendInfo?.grade) && { grade: attendInfo.grade }),
        ...(!isUndefined(attendInfo?.phoneNumber) && {
          phoneNumber: attendInfo.phoneNumber
        }),
        ...(!isUndefined(attendInfo?.sex) && {
          sex: SEX_OPTIONS.find(_sex => _sex.value === attendInfo.sex)?.label
        }),
        ..._date
      };
    });
  };

  const handleStatisticsDataToExcel = async (
    fileName: string,
    statisticsName: tStatisticsName,
    _attendData: any[],
    isDate?: boolean
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
        rowData = convertStatisticsDataToExcelData(_attendData);
        headerTitle = ["나무", "순장", "학년", "전화번호", "성별"];
        break;
      case "manager": // 나무 별
        rowData = convertStatisticsDataToExcelData(_attendData);
        headerTitle = ["나무"];
        break;
      case "grade": // 학년 별
        rowData = convertStatisticsDataToExcelData(_attendData);
        headerTitle = ["학년"];
        break;
    }

    return await ExportExcelOfJson({
      fileName,
      headerTitle,
      data: rowData,
      isDate
    });
  };

  return [handleStatisticsDataToExcel];
};
