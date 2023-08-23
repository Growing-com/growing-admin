import { FileExcelOutlined } from "@ant-design/icons";
import GRButtonText from "@component/atom/button/GRTextButton";

const ExcelButton = ({ onClickExcel }: { onClickExcel: () => void }) => {
  return (
    // 그냥 아이콘만 보여줄지 아니면 이름도 같이 보여줄지 설정으로
    <GRButtonText buttonType={"default"} size={"large"} onClick={onClickExcel}>
      <FileExcelOutlined
        rev={undefined}
        style={{ fontSize: "1rem", marginRight: "0.3rem" }}
      />
      엑셀 다운
    </GRButtonText>
  );
};

export default ExcelButton;
