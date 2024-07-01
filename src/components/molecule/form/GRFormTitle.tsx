import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
import GRInfoBadge from "../GRInfoBadge";

type tGRFormTitle = {
  title?: string;
  alertMessage?: string;
  required?: boolean;
  width?: number;
};
const GRFormTitle: FC<tGRFormTitle> = ({
  title,
  required = false,
  alertMessage,
  width = 5
}) => {
  return (
    <GRView width={width} marginright={0.5}>
      <GRFlexView flexDirection={"row"} alignItems={"center"}>
        <GRText weight={"bold"}>{title ?? ""}</GRText>
        {!!required && (
          <GRText marginleft={GRStylesConfig.BASE_MARGIN} color={Color.red100}>
            *
          </GRText>
        )}
        {!!alertMessage && <GRInfoBadge infoMessage={alertMessage} />}
      </GRFlexView>
    </GRView>
  );
};

export default GRFormTitle;
