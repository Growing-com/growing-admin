import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import GRTextButton from "@component/atom/button/GRTextButton";
import GRText from '@component/atom/text/GRText';
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import styled from "@emotion/styled";
import { Avatar, Popover } from "antd";
import { useLogoutMutate } from 'api/account/mutate/useLogoutMutate';
import { useUserInfoQuery } from 'api/account/queries/useUserInfoQuery';
import useLogin from "hooks/auth/useLogin";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";

type tHeaderMenu = {
  onClickCollapse: () => void;
};

const HeaderMenu: FC<tHeaderMenu>  = ({ onClickCollapse }) => {
  const [handleRouterCheck] = useLogin();
  const { data: userInfo } = useUserInfoQuery();

  const { logoutMutate } = useLogoutMutate();
  const router = useRouter();

  const onClickLogout = () => {
    logoutMutate();
  }

  useEffect(() => {
    handleRouterCheck();
  }, [handleRouterCheck]);

  return (
    <Header style={{ padding: "0.5rem 0rem" }}>
      <button onClick={()=>console.log(userInfo)}>userInfo</button>
      <GRView
        isFlex
        marginleft={2}
        justifyContent="center"
        onClick={onClickCollapse}
      >
        <MenuOutlined
          style={{ fontSize: "1.3rem", cursor: "pointer" }}
        />
      </GRView>
      <GRView
        isFlex
        width={8}
        style={{ position: "relative" }}
        marginhorizontal={1}
      >
        <Image
          src={"/logo/logo-row-mark.png"}
          fill={true}
          alt={"logo"}
          style={{ objectFit: "contain" }}
          priority
        />
      </GRView>
      <GRFlexView justifyContent={"space-between"} flexDirection={"row"}>
        <GRFlexView flexDirection="row" justifyContent={"end"}>
          {/* <Avatar
            style={{
              marginRight: "1rem",
              backgroundColor: Color.green200
            }}
            icon={
              <Link
                href={`${process.env.NEXT_PUBLIC_ANNOUNCEMENT}`}
                target={"_blank"}
              >
                <NotificationOutlined />
              </Link>
            }
          /> */}
          <Popover
            placement="bottom"
            trigger={"click"}
            content={() => (
              <GRView width={10}>
                <GRText weight={"bold"} fontSize={"b4"}>
                    {userInfo?.name}
                  </GRText>
                  {/* <GRFlexView flexDirection={"row"} alignItems={"flex-end"}>
                    <GRText fontSize={"b7"}>
                      {GRADE_NAME} | {DUTY_NAME}
                    </GRText>
                    <GRText
                      fontSize={"b7"}
                      weight={"bold"}
                      color={Color.grey80}
                      marginleft={GRStylesConfig.BASE_MARGIN}
                    >
                      {ROLE_NAME}
                    </GRText>
                  </GRFlexView> */}
                <GRFlexView
                  alignItems={"flex-end"}
                  margintop={GRStylesConfig.BASE_MARGIN}
                >
                  <GRTextButton width={"100%"} buttonType={"default"}
                  onClick={onClickLogout}>
                    로그아웃
                  </GRTextButton>
                </GRFlexView>
              </GRView>
            )}
          >
            <Avatar
              style={{
                backgroundColor: Color.green200,
                marginRight: "6rem",
                cursor: "pointer"
              }}
              icon={<UserOutlined />}
            > 
            </Avatar>
          </Popover>
        </GRFlexView>
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
