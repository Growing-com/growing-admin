import { LeftOutlined } from "@ant-design/icons";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Alert, Divider } from "antd";
import { useRouter } from "next/router";
import React, { ReactNode, type FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";

type tHeaderView = {
  title: string;
  headerComponent?: ReactNode;
  subComponent?: ReactNode;
  titleInfoType?: "success" | "info" | "warning" | "error";
  titleInfo?: ReactNode;
  showIcon?: boolean;
  disabledBackbutton?: boolean;
};

const HeaderView: FC<tHeaderView> = ({
  title,
  headerComponent,
  subComponent,
  titleInfoType = "warning",
  titleInfo,
  showIcon = true,
  disabledBackbutton = false
}) => {
  const router = useRouter();
  const onClickBack = () => {
    router.back();
  };
  return (
    <GRFlexView
      borderRadius={GRStylesConfig.BASE_MARGIN}
      paddinghorizontal={3}
      paddingvertical={`${disabledBackbutton ? 1.8 : 2}`}
      marginbottom={GRStylesConfig.BASE_MARGIN}
      backgroundColor="white"
      css={css`
        box-shadow: ${GRStylesConfig.BOX_SHOWDOW};
      `}
    >
      <GRFlexView
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <GRFlexView flexDirection={"row"} alignItems={"center"}>
          {disabledBackbutton && <StyledLeftOutlined onClick={onClickBack} />}
          <GRText
            fontSize={"h9"}
            weight={"bold"}
            marginright={GRStylesConfig.BASE_MARGIN}
          >
            {title}
          </GRText>
          {titleInfo && (
            <Alert
              showIcon={showIcon}
              message={titleInfo}
              type={titleInfoType}
              style={{ backgroundColor: "white" }}
              banner={true}
            />
          )}
        </GRFlexView>
        {headerComponent}
      </GRFlexView>
      {subComponent && (
        <React.Fragment>
          <Divider style={{ margin: "1rem 0rem 1rem 0rem" }} />
          {subComponent}
        </React.Fragment>
      )}
    </GRFlexView>
  );
};

export default HeaderView;

const StyledLeftOutlined = styled(LeftOutlined)`
  font-size: 1.5rem;
  margin: 0rem 1rem 0rem 0rem;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 50%;
  padding: 0.5rem;

  &:hover {
    background-color: ${Color.green100} !important;
  }
`;
