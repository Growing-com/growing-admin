import { FileExcelOutlined } from "@ant-design/icons";
import GRButtonText, {
  tButtonSize,
  tButtonType,
  tGRButtonText
} from "@component/atom/button/GRTextButton";

type tExcelButton = {
  onClickExcel: () => void;
  onlyIcon?: boolean;
  size?: tButtonSize;
  isExportData?: boolean;
  buttonType?: tButtonType;
} & tGRButtonText;

const ExcelButton = ({
  onClickExcel,
  onlyIcon = false,
  size = "large",
  buttonType = "default",
  ...props
}: tExcelButton) => {
  return (
    // 그냥 아이콘만 보여줄지 아니면 이름도 같이 보여줄지 설정으로
    <GRButtonText
      buttonType={buttonType}
      size={size}
      onClick={onClickExcel}
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
