import GRButton from "@component/base/button/GRButton";
import GRFlexView from "@component/base/view/GRFlexView";
import GRView from "@component/base/view/GRView";
import styled from "@emotion/styled";
import { Layout, Menu } from "antd";
import { DEPARTMENT_MAIN_MENU } from "config/router";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Color } from "styles/colors";

const { Content, Sider } = Layout;

type tBaseLayout = {};

const BaseLayout: React.FC<tBaseLayout> = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const router = useRouter();

  const onSelectMenu = useCallback(
    async e => {
      const newPath = e.key.replace("-", "/");
      router.push(`/department/${newPath}`);
    },
    [router]
  );

  useEffect(() => {
    setMenu(DEPARTMENT_MAIN_MENU);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ padding: "0.5rem 0rem" }}>
        <GRView width={12} style={{ position: "relative" }}>
          <Image
            src={"/logo.png"}
            fill={true}
            alt={"logo"}
            style={{ objectFit: "contain" }}
          />
        </GRView>
        <GRFlexView justifyContent={"flex-start"} flexDirection={"row"}>
          <GRButton type={"link"} textColor={Color.green200} onClick={() => {}}>
            부서
          </GRButton>
          <GRButton
            type={"link"}
            textColor={Color.green200}
            onClick={() => router.push("/login")}
          >
            로그인
          </GRButton>
        </GRFlexView>
      </Header>
      <Layout>
        <Sider
          width={"12rem"}
          style={{
            backgroundColor: "white"
          }}
        >
          <BaseLayoutMenu
            mode={"inline"}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            items={menu}
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

const Header = styled.header`
  display: flex;
  z-index: 10;
  background-color: #ffff;
  max-width: 100%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
`;

const LayoutContent = styled(Content)`
  margin: 0;
  height: "100%";
  padding: 2rem 2rem;
  background-color: ${Color.grey20};
`;

const BaseLayoutMenu = styled(Menu)`
  height: "100%";
  border-right: 0;
`;
