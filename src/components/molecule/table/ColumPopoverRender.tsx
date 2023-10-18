import { PlusCircleOutlined } from "@ant-design/icons";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import { Popover } from "antd";
import { FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";

type tColumPopoverRender = {
  content?: string | null;
  label: string;
};

const ColumPopoverRender: FC<tColumPopoverRender> = ({ content, label }) => {
  return (
    <Popover content={content ?? ""} trigger={"click"}>
      <GRButtonText buttonType={"default"} disabled={!content}>
        <PlusCircleOutlined
          rev={undefined}
          style={{ marginRight: `${GRStylesConfig.BASE_MARGIN}rem` }}
        />
        <GRText>{label ?? " "}</GRText>
      </GRButtonText>
    </Popover>
  );
};

export default ColumPopoverRender;
