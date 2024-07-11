import { QuestionCircleOutlined } from "@ant-design/icons";
import GRView from "@component/atom/view/GRView";
import { Tooltip } from "antd";
import { CSSProperties, FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
type tGRInfoBadge = {
  infoMessage: string;
  fontSize?: CSSProperties["fontSize"];
  // alignItems?: CSSProperties["alignItems"];
};
const GRInfoBadge: FC<tGRInfoBadge> = ({
  infoMessage,
  fontSize = "0.8rem",
  // alignItems
}) => {
  return (
    <GRView marginhorizontal={GRStylesConfig.BASE_MARGIN}>
      <Tooltip overlayStyle={{ whiteSpace: "pre-line" }} title={infoMessage}>
        <QuestionCircleOutlined
          style={{
            fontSize: fontSize,
            color: Color.green200,
            // alignItems: alignItems,
          }}
          rev={undefined}
        />
      </Tooltip>
    </GRView>
  );
};

export default GRInfoBadge;
