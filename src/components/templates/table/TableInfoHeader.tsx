import { RedoOutlined } from "@ant-design/icons";
import GRText from "@component/atom/text/GRText";
import GRView from "@component/atom/view/GRView";
import { Button } from "antd";
import { FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";

type tTableInfoHeader = {
  title: string;
  count: number;
  totalCount: number;
  isResetButton?: boolean;
  onClickFilterReset?: () => void;
};

const TableInfoHeader: FC<tTableInfoHeader> = ({
  title,
  count,
  totalCount,
  isResetButton = false,
  onClickFilterReset
}) => {
  return (
    <GRView>
      <GRText weight={"bold"}>{title} </GRText>
      <GRText color={Color.grey60} marginright={GRStylesConfig.BASE_MARGIN}>
        <GRText weight={"bold"} color={Color.green200}>
          {count ?? 0} 명
        </GRText>
        <GRText marginhorizontal={"0.3"}>/</GRText>
        <GRText fontSize={"b8"} color={Color.grey80}>
          총 {totalCount ?? 0} 명
        </GRText>
      </GRText>
      {isResetButton && (
        <Button size={"small"} onClick={onClickFilterReset}>
          <RedoOutlined  />
        </Button>
      )}
    </GRView>
  );
};

export default TableInfoHeader;
