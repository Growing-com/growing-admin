import { FileExcelOutlined } from "@ant-design/icons";
import GRAlert from "@component/atom/alert/GRAlert";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRView from "@component/atom/view/GRView";
import { Dropdown } from "antd";
import { tAttendanceCheckListItem } from "api/attendance/types";
import {
  tStatisticsAttendanceExcelOption,
  useStatisticsAttendanceExcelQuery
} from "api/statistics/queries/useStatisticsAttendanceExcelQuery";
import {
  tStatisticsName,
  useStatisticsDataToExcel
} from "hooks/useStatisticsDataToExcel";
import { FC, useCallback, useEffect, useState } from "react";

type tStatisticsExcelPopover = {
  newFamilyAttendanceData?: tAttendanceCheckListItem[];
  absentAttendanceData?: tAttendanceCheckListItem[];
};
const StatisticsExcelPopover: FC<tStatisticsExcelPopover> = ({
  newFamilyAttendanceData,
  absentAttendanceData
}) => {
  const [excelOption, setExcelOption] =
    useState<tStatisticsAttendanceExcelOption>();
  const [openExcelDropdown, setOpenExcelDropdown] = useState(false);

  const [handleAttendanceDataToExcel] = useStatisticsDataToExcel();

  const { data: excelData } = useStatisticsAttendanceExcelQuery({
    options: excelOption
  });

  const handleExportData = useCallback(
    async (filename: string, _dataSource?: tAttendanceCheckListItem[]) => {
      if (_dataSource?.length) {
        return await handleAttendanceDataToExcel(
          filename,
          "attendance",
          _dataSource
        );
      }
      GRAlert.error("엑셀 추출할 데이터가 없습니다");
    },
    [handleAttendanceDataToExcel]
  );

  const items = [
    {
      key: "term",
      label: "텀",
      children: [
        {
          key: "personalAttendance",
          label: "출결",
          onClick: () => setExcelOption("personalAttendance")
        },
        {
          key: "leaderAttendance",
          label: "순모임별",
          onClick: () => setExcelOption("leaderAttendance")
        },
        {
          key: "managerAttendance",
          label: "나무별",
          onClick: () => setExcelOption("managerAttendance")
        },
        {
          key: "gradeAttendance",
          label: "학년",
          onClick: () => setExcelOption("gradeAttendance")
        }
      ]
    },
    {
      key: "week",
      label: "지난주",
      children: [
        {
          key: "absentAttendance",
          label: "결석 정보",
          onClick: () =>
            handleExportData("지난주 결석 인원", absentAttendanceData)
        },
        {
          key: "newFamilyAttendance",
          label: "새가족 출결",
          onClick: () =>
            handleExportData("지난주 새가족 출결", newFamilyAttendanceData)
        }
      ]
    }
  ];

  const onOpenChange = useCallback((_open: boolean) => {
    setOpenExcelDropdown(_open);
  }, []);

  useEffect(() => {
    (async () => {
      if (excelOption && !!excelData?.length) {
        let _fileName = "출석 정보";
        let statisticsName = "attendance" as tStatisticsName;
        switch (excelOption) {
          case "gradeAttendance":
            statisticsName = "grade";
            _fileName = "텀 학년별 정보";
            break;
          case "leaderAttendance":
            statisticsName = "leader";
            _fileName = "텀 순모임별 정보";
            break;
          case "managerAttendance":
            statisticsName = "manager";
            _fileName = "텀 나무별 정보";
            break;
          case "personalAttendance":
            statisticsName = "attendance";
            _fileName = "텀 출결 정보";
            break;
        }
        await handleAttendanceDataToExcel(_fileName, statisticsName, excelData);
        setExcelOption(undefined);
      }
    })();
  }, [excelData, excelOption, handleAttendanceDataToExcel]);

  return (
    <GRView>
      <Dropdown
        menu={{
          items
        }}
        placement={"bottom"}
        arrow
        trigger={["click"]}
        onOpenChange={onOpenChange}
        open={openExcelDropdown}
      >
        <GRButtonText buttonType={"default"} size={"large"}>
          <FileExcelOutlined
            rev={undefined}
            style={{ fontSize: "1rem", marginRight: "0.3rem" }}
          />
          엑셀 다운
        </GRButtonText>
      </Dropdown>
    </GRView>
  );
};

export default StatisticsExcelPopover;
