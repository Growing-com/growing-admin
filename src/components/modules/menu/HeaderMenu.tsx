import { UserOutlined } from "@ant-design/icons";
import GRButtonText from "@component/base/button/GRTextButton";
import GRText from "@component/base/text/GRText";
import GRFlexView from "@component/base/view/GRFlexView";
import GRView from "@component/base/view/GRView";
import styled from "@emotion/styled";
import { Avatar, Popover } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";

const HeaderMenu = () => {
  const router = useRouter();

  const onClickLogout = useCallback(() => {
    router.replace("/");
  }, []);

  return (
    <Header style={{ padding: "0.5rem 0rem" }}>
      <GRView width={12} style={{ position: "relative" }} marginright={1}>
        <Image
          src={"/logo/logo-row-mark.png"}
          fill={true}
          alt={"logo"}
          style={{ objectFit: "contain" }}
        />
      </GRView>
      <GRFlexView justifyContent={"space-between"} flexDirection={"row"}>
        <GRFlexView
          justifyContent={"flex-start"}
          flexDirection={"row"}
          alignItems={"center"}
        >
          <GRText weight={"bold"} color={Color.green200} fontSize={"b5"}>
            부서
          </GRText>
        </GRFlexView>
        <Popover
          placement="bottom"
          trigger={"click"}
          content={() => (
            <GRView width={10}>
              <GRText weight={"bold"} fontSize={"b4"}>
                이종민
              </GRText>
              <GRFlexView flexDirection={"row"} alignItems={"flex-end"}>
                <GRText fontSize={"b7"}>18학년 리더</GRText>
                <GRText
                  fontSize={"b7"}
                  weight={"bold"}
                  color={Color.grey80}
                  marginleft={GRStylesConfig.BASE_MARGIN}
                >
                  관리자
                </GRText>
              </GRFlexView>
              <GRFlexView
                alignItems={"flex-end"}
                margintop={GRStylesConfig.BASE_MARGIN}
              >
                <GRButtonText
                  width={"100%"}
                  buttonType={"default"}
                  onClick={onClickLogout}
                >
                  로그아웃
                </GRButtonText>
              </GRFlexView>
            </GRView>
          )}
        >
          <Avatar
            style={{
              backgroundColor: Color.green200,
              // color:Color.green200,
              // borderColor:Color.green200,
              marginRight: "6rem"
            }}
            icon={<UserOutlined rev={undefined} />}
          />
        </Popover>
      </GRFlexView>
    </Header>
  );
};

export default HeaderMenu;

const Header = styled.header`
  display: flex;
  z-index: 10;
  background-color: #ffff;
  max-width: 100%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
`;
