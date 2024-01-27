import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import { Popover } from "antd";
import { FC } from "react";

type tColumPopoverRender = {
  content?: string | null;
  label: string;
};

const ColumPopoverRender: FC<tColumPopoverRender> = ({ content, label }) => {
  return (
    <Popover
      content={content ?? ""}
      trigger={"click"}
      overlayStyle={{
        width: "20rem"
      }}
    >
      <GRButtonText buttonType={"default"} disabled={!content}>
        {/* <PlusCircleOutlined
          rev={undefined}
          style={{ marginRight: `${GRStylesConfig.BASE_MARGIN}rem` }}
        /> */}
        <GRText>{label ?? " "}</GRText>
      </GRButtonText>
    </Popover>
  );
};

export default ColumPopoverRender;
