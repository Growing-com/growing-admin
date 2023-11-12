import { UserOutlined } from "@ant-design/icons";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import styled from "@emotion/styled";
import { Avatar, Popover } from "antd";
import { useLogoutMutate } from "api/account/mutate/useLogoutMutate";
import { useUserInfoQuery } from "api/account/queries/useUserInfoQuery";
import { DUTY, ROLE } from "config/const";
import Image from "next/image";
import { useCallback, useMemo } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";

const HeaderMenu = () => {
  const { logoutMutate } = useLogoutMutate();
  const { data: userInfo } = useUserInfoQuery();

  const DUTY_NAME = useMemo(
    () => DUTY.find(duty => duty?.key === userInfo?.duty)?.value ?? "",
    [userInfo?.duty]
  );

  const GRADE_NAME = useMemo(
    () => (userInfo?.grade ? `${userInfo?.grade}학년` : ""),
    [userInfo?.grade]
  );

  const ROLE_NAME = useMemo(
    () => ROLE.find(role => role?.key === userInfo?.role)?.value ?? "",
    [userInfo?.role]
  );

  const onClickLogout = useCallback(async () => {
    await logoutMutate();
  }, [logoutMutate]);

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
                {userInfo?.name}
              </GRText>
              <GRFlexView flexDirection={"row"} alignItems={"flex-end"}>
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
