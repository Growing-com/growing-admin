import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { css } from "@emotion/react";
import { Collapse } from "antd";
import { ExpandIconPosition } from "antd/es/collapse/Collapse";
import { useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import LineUpGroupCollapse from "./LineUpGroupCollapse";

const { Panel } = Collapse;

type tlineUpGroupCollapseItem = {
  title: string;
  data?: any[];
};

const LineUpGroupContent = () => {
  const [expandIconPosition, setExpandIconPosition] =
    useState<ExpandIconPosition>("start");

  const onPositionChange = (newExpandIconPosition: ExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };

  const [lineUpGroupCollapse, setLineUpGroupCollapse] = useState<
    tlineUpGroupCollapseItem[]
  >([{ title: "훈련생", data: [] }]);

  const onClickAddGroup = () => {
    setLineUpGroupCollapse([
      ...lineUpGroupCollapse,
      { title: `그룹${lineUpGroupCollapse.length + 1}` }
    ]);
  };

  const onClickRemoveGroup = () => {};

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
          {/* 전체 collapse 닫기 버튼 */}
          {/* <GRButtonText
            onClick={onCloseCollpse}
            buttonType={"custom"}
            size={"small"}
          >
            <ShrinkOutlined rev={undefined} />
          </GRButtonText> */}
          <GRFlexView flexDirection={"row"} justifyContent={"flex-end"}>
            <GRButtonText
              onClick={onClickRemoveGroup}
              marginright={GRStylesConfig.BASE_MARGIN}
              buttonType={"custom"}
            >
              불러오기
            </GRButtonText>
            <GRButtonText onClick={onClickAddGroup}>그룹 추가</GRButtonText>
          </GRFlexView>
        </GRFlexView>
      </GRView>
      <GRView
        height={30}
        style={{
          minHeight: "30rem",
          overflowY: "scroll"
        }}
        customCss={css`
          ::-webkit-scrollbar {
            display: none;
          }
        `}
      >
        {lineUpGroupCollapse.map((group, index) => (
          <LineUpGroupCollapse key={index} title={group.title} />
        ))}
      </GRView>
    </GRFlexView>
  );
};

export default LineUpGroupContent;
