import { FileExcelOutlined } from "@ant-design/icons";
import GRTextButton, {
    tButtonSize,
    tButtonType,
    tGRButtonText
} from "@component/atom/button/GRTextButton";
import { Popover } from "antd";

type tExcelButton = {
  onClickExcel: () => void;
  onlyIcon?: boolean;
  size?: tButtonSize;
  isExportData?: boolean;
  buttonType?: tButtonType;
  popoverprops?: {
    title?: string;
    content?: string;
  };
} & tGRButtonText;

const ExcelButton = ({
  onClickExcel,
  onlyIcon = false,
  size = "large",
  buttonType = "custom",
  popoverprops,
  ...props
}: tExcelButton) => {
  const onClick = () => {
    onClickExcel();
  };

  return (
    <>
      <Popover
        content={popoverprops?.content}
        {...(!popoverprops?.content && { open: false })}
      >
        <GRTextButton
          buttonType={buttonType}
          size={size}
          onClick={onClick}
          {...props}
        >
          <FileExcelOutlined
            style={{
              fontSize: "1rem",
              marginRight: !onlyIcon ? "0.3rem" : "0rem"
            }}
          />
          {!onlyIcon && (size === "normal" ? "엑셀" : "엑셀 다운")}
        </GRTextButton>
      </Popover>
    </>
  );
};

export default ExcelButton;
