import { ShrinkOutlined } from "@ant-design/icons";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { Collapse } from "antd";
import { ExpandIconPosition } from "antd/es/collapse/Collapse";
import { useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import LineUpGroupCollapse from "./LineUpGroupCollapse";

const { Panel } = Collapse;

const LineUpGroupContent = () => {
  const [expandIconPosition, setExpandIconPosition] =
    useState<ExpandIconPosition>("start");

  const onPositionChange = (newExpandIconPosition: ExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };

  const [lineUpGroupCollapse, setLineUpGroupCollapse] = useState<string[]>([
    { title: "훈련생", data: [] }
  ]);

  const onClickAddGroup = () => {
    setLineUpGroupCollapse([
      ...lineUpGroupCollapse,
      { title: `그룹${lineUpGroupCollapse.length + 1}` }
    ]);
  };
  const onCloseCollpse = () => {};

  return (
    <GRFlexView>
      <GRView
        isFlex
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginbottom={GRStylesConfig.BASE_MARGIN}
      >
        <GRText weight={"bold"} marginright={0.5}>
          그룹
        </GRText>
        <GRFlexView flexDirection={"row"} justifyContent={"space-between"}>
          <GRButtonText
            onClick={onCloseCollpse}
            buttonType={"custom"}
            size={"small"}
          >
            <ShrinkOutlined rev={undefined} />
          </GRButtonText>
          <GRButtonText onClick={onClickAddGroup} buttonType={"default"}>
            그룹 추가
          </GRButtonText>
        </GRFlexView>
      </GRView>
      <GRFlexView>
        {lineUpGroupCollapse.map((group, index) => (
          <LineUpGroupCollapse title={group.title} />
        ))}
      </GRFlexView>
    </GRFlexView>
  );
};

export default LineUpGroupContent;
