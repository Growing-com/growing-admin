import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { Alert, Tooltip } from "antd";
import { FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";

type tGRFormTitle = {
  title?: string;
  alertMessage?: string;
  required?: boolean;
};
const GRFormTitle: FC<tGRFormTitle> = ({
  title,
  required = false,
  alertMessage
}) => {
  return (
    <GRView width={5} marginhorizontal={1}>
      <GRFlexView flexDirection={"row"} alignItems={"center"}>
        <GRText weight={"bold"}>
          {title ?? ""}
          {!!required && (
            <GRText
              marginleft={GRStylesConfig.BASE_MARGIN}
              color={Color.red100}
            >
              *
            </GRText>
          )}
        </GRText>
        {!!alertMessage && (
          <Tooltip
            overlayStyle={{ whiteSpace: "pre-line" }}
            title={alertMessage}
          >
            <Alert
              showIcon
              type={"info"}
              banner={true}
              style={{ backgroundColor: "transparent" }}
            />
          </Tooltip>
        )}
      </GRFlexView>
    </GRView>
  );
};

export default GRFormTitle;
