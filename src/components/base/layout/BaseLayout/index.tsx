import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { DEPARTMENT_MAIN_MENU } from "config/router";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";


const { Content, Sider } = Layout;

type tBaseLayout = {};

const BaseLayout: React.FC = ({ children }) => {
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
    console.log("newPath",newPath)
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
        <Image src={"/logo.png"} width={"150"} height={"50"} />
        <div>부서</div>
      </Header>
      <Layout>
        <Sider
          width={200}
          css={css`
            border-right: 0.1rem solid green};
          `}
        >
          {!!menu.length && <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={menu}
            onSelect={onSelectMenu}
          />}
        </Sider>
        <Layout style={{ padding: "24px 24px", backgroundColor: "white" }}>
          <Content
            style={{
              padding: 0,
              margin: 0,
              height: "100%",
            }}
          >
            {children}
          </Content>
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
