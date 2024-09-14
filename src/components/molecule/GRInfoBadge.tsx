import { QuestionCircleOutlined } from "@ant-design/icons";
import GRView from "@component/atom/view/GRView";
import { Tooltip } from "antd";
import { FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
type tGRInfoBadge = {
  infoMessage: string;
};
const GRInfoBadge: FC<tGRInfoBadge> = ({ infoMessage }) => {
  return (
    <GRView marginhorizontal={GRStylesConfig.BASE_MARGIN}>
      <Tooltip overlayStyle={{ whiteSpace: "pre-line" }} title={infoMessage}>
        <QuestionCircleOutlined
          style={{
            fontSize: "0.8rem",
            color: Color.green200
          }}
        />
      </Tooltip>
    </GRView>
  );
};

export default GRInfoBadge;
