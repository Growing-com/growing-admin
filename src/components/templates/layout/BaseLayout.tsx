import HeaderMenu from "@component/molecule/menu/HeaderMenu";
import styled from "@emotion/styled";
import { Layout, Menu } from "antd";
import { TAB_MENU } from "config/router";
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
import { Color } from "styles/colors";

const { Content, Sider } = Layout;

export type tMenuInfo = {
  key: string;
  keyPath: string[];
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
};

export type tSelectInfo = tMenuInfo & {
  selectedKeys: string[];
};

type tBaseLayout = {
  children?: React.ReactNode;
};

const BaseLayout: FC<tBaseLayout> = ({ children }) => {
  const router = useRouter();

  const { menu: mainMenu } = menuStore();

  const [handleRouterCheck] = useLogin();

  const [tabMenu] = useState(TAB_MENU[0].key);
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

  useLayoutEffect(() => {
    if (router.pathname) {
      const _path = router.pathname.split("/");
      openMetMainMenu([_path[2]]);
      setSelectedSubMenu([`${_path[2]}-${_path[3]}`]);
    }
  }, [router.pathname]);

  useEffect(() => {
    handleRouterCheck();
  }, [handleRouterCheck]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderMenu />
      <Layout>
        <Sider
          style={{
            backgroundColor: "white"
          }}
        >
          <BaseLayoutMenu
            mode={"inline"}
            items={mainMenu}
            // defaultOpenKeys={defaultOpen}
            // defaultSelectedKeys={defaultSelected}
            selectedKeys={selectedSubMenu} // 선택되는 key, sub-menu 를 선택 하면 main 도 같이 선택됨
            openKeys={defaultOpen} // 열리게 되는 sub menu
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
