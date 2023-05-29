import HeaderMenu from "@component/modules/menu/HeaderMenu";
import styled from "@emotion/styled";
import { Layout, Menu } from "antd";
import { DEPARTMENT_MAIN_MENU } from "config/router";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState, type FC } from "react";
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

  const [menu, setMenu] = useState([]);
  const [openKeys, setOpenKeys] = useState<string>(DEPARTMENT_MAIN_MENU[0].key);

  const onSelectMenu = useCallback(
    async (info: tSelectInfo) => {
      const newPath = info.key.replace("-", "/");
      router.push(`/department/${newPath}`);
    },
    [router]
  );

  const onOpenChange = (keys: string[]) => {
    console.log("keys", keys);
    if (openKeys.length) {
      const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    }
    // if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
    //   setOpenKeys(keys);
    // } else {
    //   setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    // }
  };

  useEffect(() => {}, []);

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
  background-color: ${Color.grey80};
`;

const BaseLayoutMenu = styled(Menu)`
  height: "100%";
  border-right: 0;
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
