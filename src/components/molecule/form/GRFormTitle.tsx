import GRText from "@component/atom/text/GRText";
import { FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";

type tGRFormTitle = {
  title?: string;
  required?: boolean;
};
const GRFormTitle: FC<tGRFormTitle> = ({ title, required = false }) => {
  return (
    <GRText marginbottom={1} marginhorizontal={1} width={4} weight={"bold"}>
      {title ?? ""}
      {!!required && (
        <GRText marginleft={GRStylesConfig.BASE_MARGIN} color={Color.red100}>
          *
        </GRText>
      )}
    </GRText>
  );
};

export default GRFormTitle;
