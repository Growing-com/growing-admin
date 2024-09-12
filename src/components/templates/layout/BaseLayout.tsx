import { tSelectInfo } from "@component/molecule/menu/HlowHeaderMenu";
import styled from "@emotion/styled";
import { Layout, Menu } from "antd";
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
import GRStylesConfig from 'styles/GRStylesConfig';
import { Color } from "styles/colors";

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
      const newPath = info.key.replace("-", "/");
      router.push(`/department/${newPath}`);
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
          backgroundColor: "white",
        }}
        trigger={null}
        collapsed={true}
        collapsedWidth={GRStylesConfig.COLLAPSED_WIDTH}
      >
        <div>HLOW LOGO</div>
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
  border-right: 0;
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
  .ant-menu-item-selected {
    font-weight: bold;
  }
  .ant-menu-submenu-title {
    :hover {
      background-color: ${Color.red100} !important;
    }
  }
  .ant-menu-item {
    :hover {
      // background-color: ${Color.red100} !important;
    }
  }
`;
