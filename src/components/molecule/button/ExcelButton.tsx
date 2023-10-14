import { FileExcelOutlined } from "@ant-design/icons";
import GRAlert from "@component/atom/alert/GRAlert";
import GRButtonText, {
  tButtonSize,
  tButtonType,
  tGRButtonText
} from "@component/atom/button/GRTextButton";
import ExportExcelOfJson from "modules/excel/ExportExcelOfJson";
import { useCallback } from "react";

type tExcelButton = {
  onClickExcel: () => void;
  onlyIcon?: boolean;
  size?: tButtonSize;
  data: any[];
  isExportData?: boolean;
  buttonType?: tButtonType;
} & tGRButtonText;

const ExcelButton = ({
  onClickExcel,
  onlyIcon = false,
  size = "large",
  data,
  isExportData = true,
  buttonType = "default",
  ...props
}: tExcelButton) => {
  console.log("statisticsAbsentData", data);
  const handleExcelButton = useCallback(async () => {
    if (!isExportData) {
      return onClickExcel();
    }
    if (!data.length) {
      return GRAlert.error("뽑을 데이터가 존재 하지 않습니다");
    }

    try {
      await ExportExcelOfJson({
        data
      });
      onClickExcel();
    } catch (e) {
      return GRAlert.error("엑셀 추출 실패 했습니다");
    }
  }, [data, isExportData, onClickExcel]);

  return (
    // 그냥 아이콘만 보여줄지 아니면 이름도 같이 보여줄지 설정으로
    <GRButtonText
      buttonType={buttonType}
      size={size}
      onClick={handleExcelButton}
      {...props}
    >
      <FileExcelOutlined
        rev={undefined}
        style={{
          fontSize: "1rem",
          marginRight: !onlyIcon ? "0.3rem" : "0rem"
        }}
      />
      {!onlyIcon && "엑셀 다운"}
    </GRButtonText>
  );
};

export default ExcelButton;
