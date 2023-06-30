import HeaderMenu from "@component/molecule/menu/HeaderMenu";
import styled from "@emotion/styled";
import { Layout, Menu } from "antd";
import { DEPARTMENT_MAIN_MENU, TAB_MENU } from "config/router";
import { useRouter } from "next/router";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  type FC
} from "react";
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

  const [tabMenu] = useState(TAB_MENU[0].key);
  const [defaultOpen, setDefaultOpen] = useState<string[]>();
  const [defaultSelected, setDefaultSelected] = useState<string[]>();

  const [mainMenu, setMainMenu] = useState<string[]>();
  const [subMenu, setSubMenu] = useState<string[]>();

  const onSelectMenu = useCallback(
    async (info: tSelectInfo) => {
      const newPath = info.key.replace("-", "/");
      setSubMenu([info.key]);
      router.push(`/department/${newPath}`);
    },
    [router]
  );

  const onOpenChange = (keys: string[]) => {
    setMainMenu(keys);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const _mainDefault = TAB_MENU.find(tab => tab.key === tabMenu)!.children;
    setDefaultOpen([_mainDefault[0].key]);
    const _subDefault = [_mainDefault[0].key];
    setDefaultSelected(_subDefault);
  }, [tabMenu]);

  useLayoutEffect(() => {
    if (router.pathname) {
      const _path = router.pathname.split("/");
      setMainMenu([_path[2]]);
      setSubMenu([`${_path[2]}-${_path[3]}`]);
    }
  }, [router.pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderMenu />
      <Layout>
        <Sider
          width={"12rem"}
          style={{
            backgroundColor: "white"
          }}
        >
          <BaseLayoutMenu
            mode={"inline"}
            items={DEPARTMENT_MAIN_MENU}
            defaultOpenKeys={defaultOpen}
            defaultSelectedKeys={defaultSelected}
            selectedKeys={subMenu} // 선택되는 key, sub-menu 를 선택 하면 main 도 같이 선택됨
            openKeys={mainMenu} // 열리게 되는 sub menu
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
  padding: 1rem 4rem;
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
