import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import Image from 'next/image';

const { Content, Sider } = Layout;

type tBaseLayout = {

}


const BaseLayout: React.FC = ({ children }) => {
  const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));
  
  const items2: MenuProps['items'] = ["1","2","3","4"].map(
    (icon, index) => {
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
    },
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
          <Image src={'/logo.png'} width={"150"} height={"50"}/>
          <div>
            부서
          </div>
      </Header>
      <Layout>
        <Sider width={200} css={css`
          border-right: 0.1rem solid rgba(5,5,5,0.1);
        `}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
      <Layout style={{ padding: '24px 24px', backgroundColor:'white' }}>
          <Content
            style={{
              padding:0,
              margin: 0,
              height:'100%',
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default BaseLayout;

const Header = styled.header`
  display: flex;
  position: relative;
  z-index: 10;
  background-color: #ffff;
  max-width: 100%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
`
