import HeaderMenu from "@component/molecule/menu/HeaderMenu";
import styled from "@emotion/styled";
import { Layout, Menu } from "antd";
import { TAB_MENU } from 'config/router';
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

  const [openedSubMenu, setOpenedSubMenu] = useState<string[]>();
  const [selectedSubMenu, setSelectedSubMenu] = useState<string[]>();
  const [collapsed, setCollapsed] = useState(false);

  const onSelectMenu = useCallback(
    async (info: tSelectInfo) => {
      const newPath = info.key.replace("-", "/");
      router.push(`/department/${newPath}`);
    },
    [router]
  );

  const onOpenChange = (keys: string[]) => {
    setOpenedSubMenu(keys);
    console.log("setOpenedSubMenu",keys);
  };

  const onClickCollapse = () => {
    setCollapsed(!collapsed);
  };

  // 서브 메뉴 열림 변수 설정
  useEffect(() => {
    const _mainDefault = TAB_MENU.find(
      tab => tab.key === "department"
    )?.children;
    if (_mainDefault) {
      const _defaultSubMenuOpen = _mainDefault.map(menu => menu.key);
      setOpenedSubMenu(_defaultSubMenuOpen);
    }
  }, []);

  // useLayoutEffect가 서버에서는 동작하지 않게.
  const STR_UNDEFINED = "undefined";
  const isWindowDefined = typeof window != STR_UNDEFINED;
  const IS_NODE = !isWindowDefined || "process" in globalThis;
  const useIsomorphicLayoutEffect = IS_NODE ? useEffect : useLayoutEffect;

  useIsomorphicLayoutEffect(() => {
    if (router.pathname) {
      const _path = router.pathname.split("/");
      setSelectedSubMenu([`${_path[2]}-${_path[3]}`]);
    }
  }, [router.pathname]);

  useEffect(() => {
    handleRouterCheck();
  }, [handleRouterCheck]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderMenu onClickCollapse={onClickCollapse} />
      <Layout>
        <Sider
          style={{
            backgroundColor: "white"
          }}
          trigger={null}
          collapsed={collapsed}
          collapsedWidth={GRStylesConfig.COLLAPSED_WIDTH}
        >
          <BaseLayoutMenu
            mode={"inline"}
            items={mainMenu}
            selectedKeys={selectedSubMenu} // 선택되는 key, sub-menu 를 선택 하면 main 도 같이 선택됨
            openKeys={openedSubMenu} // 열리게 되는 sub menu
            onSelect={onSelectMenu}
            onOpenChange={onOpenChange}
          />
        </Sider>
        <Layout>
          <LayoutContent>{children}</LayoutContent>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;

const LayoutContent = styled(Content)`
  margin: 0;
  height: "100%";
  padding: 1rem 1.5rem;
  background-color: ${Color.grey160};
`;

const BaseLayoutMenu = styled(Menu)`
  height: "100%";
  .ant-menu {
    // background-color: ${Color.white} !important;
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
`;
