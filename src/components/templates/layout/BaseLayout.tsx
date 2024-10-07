import HeaderMenu from "@component/molecule/menu/HeaderMenu";
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

  // const [tabMenu] = useState(TAB_MENU[0].key);
  // const [defaultOpen, setDefaultOpen] = useState<string[]>();
  // const [defaultSelected, setDefaultSelected] = useState<string[]>();
  // const [selectedSubMenu, setSelectedSubMenu] = useState<string[]>();
  const [collapsed, setCollapsed] = useState(false);

  const onSelectMenu = useCallback(
    async (info: tSelectInfo) => {
      // console.log(info);
      // const newPath = info.key.replace("-", "/");
      // router.push(`/department/${newPath}`);
      router.push(`/department/${info.key}`);
    },
    [router]
  );

  const onClickCollapse = () => {
    setCollapsed(!collapsed);
  };

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
            selectedKeys={openMainMenu}
            onSelect={onSelectMenu}
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
    background-color: ${Color.red100} !important;
  }

  .ant-menu-submenu-selected {
    .ant-menu-submenu-title {
      .ant-menu-title-content {
        font-weight: bold;
      }
    }
  }
  // .ant-menu-submenu-title {
  //   :hover {
  //     background-color: ${Color.green100} !important;
  //   }
  // }

  .ant-menu-item-selected {
    font-weight: bold;
  }
`;
