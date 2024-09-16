import GRFlexView from "@component/atom/view/GRFlexView";
import styled from "@emotion/styled";
import { Layout, Menu } from "antd";
import { HlowLogoWhiteIcon } from "config/icon";
import useLogin from "hooks/auth/useLogin";
import { useRouter } from "next/router";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  type FC
} from "react";
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

const { Content, Sider } = Layout;

type tBaseLayout = {
  children?: React.ReactNode;
};

const BaseLayout: FC<tBaseLayout> = ({ children }) => {
  const router = useRouter();
  const { menu: mainMenu } = menuStore();
  const [handleRouterCheck] = useLogin();

  const [openMainMenu, openMetMainMenu] = useState<string[]>();

  const onSelectMenu = useCallback(
    async (info: tSelectInfo) => {
      // console.log(info);
      // const newPath = info.key.replace("-", "/");
      // router.push(`/department/${newPath}`);
      router.push(`/department/${info.key}`);
    },
    [router]
  );

  // useLayoutEffect가 서버에서는 동작하지 않게.
  const STR_UNDEFINED = "undefined";
  const isWindowDefined = typeof window != STR_UNDEFINED;
  const IS_NODE = !isWindowDefined || "process" in globalThis;
  const useIsomorphicLayoutEffect = IS_NODE ? useEffect : useLayoutEffect;

  useIsomorphicLayoutEffect(() => {
    if (router.pathname) {
      const _path = router.pathname.split("/");
      openMetMainMenu([_path[2]]);
    }
  }, [router.pathname]);

  useEffect(() => {
    handleRouterCheck();
  }, [handleRouterCheck]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <LayoutSider
        style={{
          backgroundColor: "white"
        }}
        trigger={null}
        collapsed={true}
        collapsedWidth={GRStylesConfig.COLLAPSED_WIDTH}
      >
        <GRFlexView justifyContent='center' marginleft={1.125} margintop={2}>
          <HlowLogoWhiteIcon />
        </GRFlexView>
        <BaseLayoutMenu
          mode={"inline"}
          items={mainMenu}
          selectedKeys={openMainMenu}
          onSelect={onSelectMenu}
        />
      </LayoutSider>
      <Layout>
        <LayoutContent>{children}</LayoutContent>
      </Layout>
      <LayoutSider
        style={{
          backgroundColor: "white"
        }}
        collapsed={true}
        collapsedWidth={GRStylesConfig.COLLAPSED_WIDTH}
      >
        오른쪽 사이드바
      </LayoutSider>
    </Layout>
  );
};

export default BaseLayout;

const LayoutContent = styled(Content)`
  margin: 0;
  height: "100%";
  background-color: ${Color.black200};
  // padding: 1rem 1.5rem;
`;

const LayoutSider = styled(Sider)`
  background-color: ${Color.black200} !important;
`;

const BaseLayoutMenu = styled(Menu)`
  height: "100%";
  .ant-menu {
    background-color: ${Color.red100} !important;
  }

  .ant-menu-submenu-selected {
    .ant-menu-submenu-title {
      .ant-menu-title-content {
        font-weight: bold;
      }
    }
  }

  
  .ant-menu-item.ant-menu-item-selected {
    background-color: ${Color.black100} !important;
    color: ${Color.white} !important;
    box-shadow: inset 0px 4px 4px 0px #000000;
  }

  .ant-menu-item {
    border: solid 1px; 
    border-color: ${Color.black100};
    background-color: ${Color.white} !important;
    color: ${Color.black200} !important;

    // height: 2.5rem !important;
    width: 2.5rem !important;
    margin-top: 39px;
    margin-bottom: 39px;
    margin-left: 1.125rem !important;
    padding: 21px !important;
    border-radius: 50% !important;
    
    :hover {
    }

    display: flex; !important;
  }
`;
