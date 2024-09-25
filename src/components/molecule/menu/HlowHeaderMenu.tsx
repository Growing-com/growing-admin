import { NotificationOutlined, UserOutlined } from "@ant-design/icons";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import styled from "@emotion/styled";
import { Avatar, Menu, Popover } from "antd";
import { TAB_MENU } from 'config/router';
import useLogin from "hooks/auth/useLogin";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import menuStore from "store/clientStore/menuStore";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";

export type tMenuInfo = {
  key: string;
  keyPath: string[];
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
};

export type tSelectInfo = tMenuInfo & {
  selectedKeys: string[];
};

const HlowHeaderMenu: FC = ({}) => {
  const router = useRouter();
  const isLogin = router.pathname === "/login";

  const { menu: mainMenu } = menuStore();

  const [handleRouterCheck] = useLogin();

  const [defaultOpen, setDefaultOpen] = useState<string[]>();
  const [openMainMenu, openMetMainMenu] = useState<string[]>();
  const [defaultSelected, setDefaultSelected] = useState<string[]>();
  const [selectedSubMenu, setSelectedSubMenu] = useState<string[]>();

  const onSelectMenu = useCallback(
    async (info: tSelectInfo) => {
      const newPath = info.key.replace("-", "/");
      setSelectedSubMenu([info.key]);
      router.push(`/department/${newPath}`);
    },
    [router]
  );

  // useLayoutEffect가 서버에서는 동작하지 않게.
  const STR_UNDEFINED = "undefined";
  const isWindowDefined = typeof window != STR_UNDEFINED;
  const IS_NODE = !isWindowDefined || "process" in globalThis;
  const useIsomorphicLayoutEffect = IS_NODE ? useEffect : useLayoutEffect;

  const onOpenChange = (keys: string[]) => {
    setDefaultOpen(keys);
  };

  useEffect(() => {
    const _mainDefault = TAB_MENU.find(
      tab => tab.key === "department"
    )?.children;
    if (_mainDefault) {
      const _defaultOpen = _mainDefault.map(menu => menu.key);
      setDefaultOpen(_defaultOpen);
      const _subDefault = [_mainDefault[0].key];
      setDefaultSelected(_subDefault);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (router.pathname) {
      const _path = router.pathname.split("/");
      openMetMainMenu([_path[2]]);
      setSelectedSubMenu([`${_path[2]}-${_path[3]}`]);
      console.log('_path[2]',_path[2])
      console.log('_path[3]',_path[3])
    }
  }, [router.pathname]);

  useEffect(() => {
    handleRouterCheck();
  }, [handleRouterCheck]);

  return (
    <Header style={{ padding: "0.5rem 0rem" }}>
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
      <BaseLayoutMenu
        mode={"inline"}
        items={mainMenu}
        selectedKeys={selectedSubMenu} // 선택되는 key, sub-menu 를 선택 하면 main 도 같이 선택됨
        openKeys={defaultOpen} // 열리게 되는 sub menu
        onSelect={onSelectMenu}
        onOpenChange={onOpenChange}
      />
      <GRFlexView justifyContent={"space-between"} flexDirection={"row"}>
        <GRFlexView flexDirection="row" justifyContent={"end"}>
          <Avatar
            style={{
              marginRight: "1rem",
              backgroundColor: Color.green200
            }}
            icon={
              <Link
                href={`${process.env.NEXT_PUBLIC_ANNOUNCEMENT}`}
                target={"_blank"}
              >
                <NotificationOutlined rev={undefined} />
              </Link>
            }
          />
          <Popover
            placement="bottom"
            trigger={"click"}
            content={() => (
              <GRView width={10}>
                {/* <GRText weight={"bold"} fontSize={"b4"}>
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
                  </GRFlexView> */}
                <GRFlexView
                  alignItems={"flex-end"}
                  margintop={GRStylesConfig.BASE_MARGIN}
                >
                  <GRButtonText width={"100%"} buttonType={"default"}>
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
      </GRFlexView>
    </Header>
  );
};

export default HlowHeaderMenu;

const Header = styled.header`
  display: flex;
  z-index: 10;
  background-color: #ffff;
  max-width: 100%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
`;

const BaseLayoutMenu = styled(Menu)`
  height: "100%";
  border-right: 0;
  .ant-menu {
    background-color: ${Color.white} !important;
  }
  .ant-menu-submenu-selected {
    .ant-menu-submenu-title {
      .ant-menu-title-content {
        font-weight: bold;
      }
    }
  }
  .ant-menu-item-selected {
    font-weight: bold;
  }
  .ant-menu-submenu-title {
    :hover {
      background-color: ${Color.green100} !important;
    }
  }
  .ant-menu-item {
    :hover {
      background-color: ${Color.green100} !important;
    }
  }
`;
