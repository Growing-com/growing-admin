import GRButton from "@component/base/button/GRButton";
import GRText from "@component/base/text/GRText";
import GRFlexView from "@component/base/view/GRFlexView";
import GRView from "@component/base/view/GRView";
import styled from "@emotion/styled";
import { Layout, Menu } from "antd";
import { DEPARTMENT_MAIN_MENU } from "config/router";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState, type FC } from "react";
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
  children?: React.ReactNode
};

const BaseLayout: FC<tBaseLayout> = ({ children }) => {
  const router = useRouter();

  const [menu,setMenu] = useState([]);
  const [openKeys, setOpenKeys] = useState<string>(DEPARTMENT_MAIN_MENU[0].key);

  const onSelectMenu = useCallback(async( info : tSelectInfo )=>{
    const newPath = info.key.replace("-","/");
    router.push(`/department/${newPath}`)
  },[router])

  const onOpenChange = (keys: string[]) => {
    console.log("keys",keys)
    if( openKeys.length ){
      const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    }
    // if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
    //   setOpenKeys(keys);
    // } else {
    //   setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    // }
  };

  useEffect(()=>{
  },[])

  return (
    <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ padding: "0.5rem 0rem" }}>
          <GRView width={12} style={{ position:'relative' }}>
            <Image src={"/logo.png"} fill={true} alt={"logo"} style={{ objectFit:"contain" }} />
          </GRView>
          <GRFlexView justifyContent={"flex-start"} flexDirection={"row"}>
            <GRButton type={"link"} textColor={Color.green200}  onClick={() => {}}>
              부서
            </GRButton>
            <GRButton type={"link"} textColor={Color.green200}  onClick={() => router.push('/login')}>
              로그인
            </GRButton>
          </GRFlexView>
        </Header>
      <Layout>
        <Sider width={'12rem'} style={{
          backgroundColor: "white",
        }}>
          <BaseLayoutMenu
            mode={"inline"}
            items={DEPARTMENT_MAIN_MENU}
            onSelect={onSelectMenu}
            onOpenChange={onOpenChange}
          />
        </Sider>
        <Layout>
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
  z-index: 10;
  background-color: #ffff;
  max-width: 100%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
`;

const LayoutContent = styled(Content)`
  margin: 0;
  height: "100%";
  padding: 1rem 4rem;
  background-color: ${Color.grey20};
`

const BaseLayoutMenu = styled(Menu)`
  height: "100%";
  border-right: 0;
  .ant-menu-submenu-title{
    :hover{
      background-color: ${Color.green100} !important;
    }
  }
  .ant-menu-item{
    :hover{
      background-color: ${Color.green100} !important;
    }
  }
  
`