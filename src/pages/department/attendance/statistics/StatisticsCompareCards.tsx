import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { css } from "@emotion/react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
const customBox = css`
  /* border: 0.1rem solid ${Color.grey100}; */
  /* box-shadow: rgba(32, 200, 113, 0.1) 4px 1px 20px -5px, rgba(0,0,0, 0.1) 0px 3px 7px -3px; */
  box-shadow: ${GRStylesConfig.BOX_SHOWDOW};
  border-radius: 1rem;
`;

const StatisticsCompareCards = () => {
  return (
    <GRView marginbottom={2}>
      <GRText
        weight={"bold"}
        fontSize={"b4"}
        marginbottom={GRStylesConfig.BASE_MARGIN}
      >
        ⚡️ 지난주 대비
      </GRText>
      <GRFlexView flexDirection={"row"} marginbottom={1}>
        <GRFlexView padding={1} marginright={1} css={customBox}>
          <GRText fontSize={"b6"} color={Color.grey80} weight={"bold"}>
            전체 인원
          </GRText>
          <GRView>
            <GRText fontSize={"h6"}>200</GRText>
            <GRText
              fontSize={"b7"}
              marginleft={GRStylesConfig.BASE_MARGIN}
              color={Color.grey80}
            >
              210 ( 2023-05-23 )
            </GRText>
          </GRView>
          <GRView>
            <GRText color={Color.red100} weight={"bold"}>
              -10 % <ArrowDownOutlined rev={undefined} />
            </GRText>
          </GRView>
        </GRFlexView>
        <GRFlexView padding={1} marginright={1} css={customBox}>
          <GRText fontSize={"b6"} color={Color.grey80} weight={"bold"}>
            결석율
          </GRText>
          <GRView>
            <GRText fontSize={"h6"}>200</GRText>
            <GRText
              fontSize={"b7"}
              marginleft={GRStylesConfig.BASE_MARGIN}
              color={Color.grey80}
            >
              200 ( 2023-05-23 )
            </GRText>
          </GRView>
          <GRView>
            <GRText color={Color.blue100} weight={"bold"}>
              +20 % <ArrowUpOutlined rev={undefined} />
            </GRText>
          </GRView>
        </GRFlexView>
        <GRFlexView padding={1} marginright={1} css={customBox}>
          <GRText fontSize={"b6"} color={Color.grey80} weight={"bold"}>
            새등록
          </GRText>
          <GRView>
            <GRText fontSize={"h6"}>200</GRText>
            <GRText
              fontSize={"b7"}
              marginleft={GRStylesConfig.BASE_MARGIN}
              color={Color.grey80}
            >
              200 ( 2023-05-23 )
            </GRText>
          </GRView>
          <GRView>
            <GRText color={Color.blue100} weight={"bold"}>
              +20 % <ArrowUpOutlined rev={undefined} />
            </GRText>
          </GRView>
        </GRFlexView>
        <GRFlexView padding={1} marginright={1} css={customBox}>
          <GRText fontSize={"b6"} color={Color.grey80} weight={"bold"}>
            새가족 출석율
          </GRText>
          <GRView>
            <GRText fontSize={"h6"}>200</GRText>
            <GRText
              fontSize={"b7"}
              marginleft={GRStylesConfig.BASE_MARGIN}
              color={Color.grey80}
            >
              200 ( 2023-05-23 )
            </GRText>
          </GRView>
          <GRText color={Color.blue100} weight={"bold"}>
            +20 % <ArrowUpOutlined rev={undefined} />
          </GRText>
        </GRFlexView>
      </GRFlexView>
    </GRView>
  );
};

export default StatisticsCompareCards;
