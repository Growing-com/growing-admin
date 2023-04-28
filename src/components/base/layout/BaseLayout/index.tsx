import GRButton from "@component/base/button/GRButton";
import GRFlexView from "@component/base/view/GRFlexView";
import GRView from "@component/base/view/GRView";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { DEPARTMENT_MAIN_MENU } from "config/router";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Color } from "styles/colors";

const { Content, Sider } = Layout;

type tBaseLayout = {};

const BaseLayout: React.FC<tBaseLayout> = ({ children }) => {
  const [menu,setMenu] = useState([]);
  const router = useRouter();

  const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

  const items2: MenuProps["items"] = ["1", "2", "3", "4"].map((icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });
  
  const onSelectMenu = useCallback(async(e)=>{
    const newPath = e.key.replace("-","/");
    router.push(`/department/${newPath}`)
  },[router])

  useEffect(()=>{
    const menuItems = DEPARTMENT_MAIN_MENU.map( main => {
      return {
        key:main.key,
        label: main.label,
        children: main.children
      }      
    } )
    console.log("!!")
    setMenu(menuItems)
  },[])

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <GRFlexView  justifyContent={"center"}alignItems={"center"} backgroundColor={"blue"}>
          <Image src={"/logo.png"} width={100} height={30} alt={"logo"} style={{
            objectFit:'contain',
            backgroundColor:'red'
          }}/>
        </GRFlexView>
        <GRFlexView justifyContent={"flex-start"}>
          <GRButton buttonType={"link"} onClick={() => {}}>
            부서
          </GRButton>
        </GRFlexView>
      </Header>
      <Layout>
        <BaseLayoutSider>
          {!!menu.length && 
            <BaseLayoutMenu
              mode={"inline"}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              items={menu}
              onSelect={onSelectMenu}
            />
          }
        </BaseLayoutSider>
        <Layout style={{ padding: "24px 24px" }}>
          <LayoutContent>
            {children}
          </LayoutContent>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;

const Header = styled.header`
  display: flex;
  position: relative;
  z-index: 10;
  background-color: #ffff;
  max-width: 100%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
`;

const LayoutContent = styled(Content)`
  padding: 0;
  margin: 0;
  height: "100%";
`

const BaseLayoutSider = styled(Sider)`
  border-right: 0.01rem solid ${Color.grey100};
  width: 12rem;
`

const BaseLayoutMenu = styled(Menu)`
  height: "100%";
  border-right: 0;
`