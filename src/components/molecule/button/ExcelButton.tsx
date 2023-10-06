import { FileExcelOutlined } from "@ant-design/icons";
import GRButtonText, { tButtonSize } from "@component/atom/button/GRTextButton";

const ExcelButton = ({
  onClickExcel,
  onlyIcon = false,
  size
}: {
  onClickExcel: () => void;
  onlyIcon?: boolean;
  size: tButtonSize;
}) => {
  return (
    // 그냥 아이콘만 보여줄지 아니면 이름도 같이 보여줄지 설정으로
    <GRButtonText buttonType={"default"} size={size} onClick={onClickExcel}>
      <FileExcelOutlined
        rev={undefined}
        style={{ fontSize: "1rem", marginRight: "0.3rem" }}
      />
      {!onlyIcon && "엑셀 다운"}
    </GRButtonText>
  );
};

export default ExcelButton;
