import { LeftOutlined } from "@ant-design/icons";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import { css } from "@emotion/react";
import { Alert, Divider } from "antd";
import { useRouter } from "next/router";
import React, { ReactNode, type FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";

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
      paddingvertical={2}
      marginbottom={GRStylesConfig.BASE_MARGIN}
      backgroundColor="white"
      css={css`
        box-shadow: ${GRStylesConfig.BOX_SHOWDOW};
      `}
    >
      <GRFlexView flexDirection={"row"} justifyContent={"space-between"}>
        <GRFlexView flexDirection={"row"}>
          {disabledBackbutton && (
            <LeftOutlined
              rev={undefined}
              style={{
                fontSize: "1.5rem",
                margin: "0rem 1rem 0rem 0rem",
                cursor: "pointer"
              }}
              onClick={onClickBack}
            />
          )}
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
