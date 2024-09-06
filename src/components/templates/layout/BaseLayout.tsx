import HlowHeaderMenu from "@component/molecule/menu/HlowHeaderMenu";
import styled from "@emotion/styled";
import { Layout } from "antd";
import { type FC } from "react";
import { Color } from "styles/colors";

const { Content } = Layout;

type tBaseLayout = {
  children?: React.ReactNode;
};

const BaseLayout: FC<tBaseLayout> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HlowHeaderMenu />
      <LayoutContent>{children}</LayoutContent>
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
