import styled from "@emotion/styled";
import { FloatButton } from "antd";
import { ReactNode, type FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";

const GRContainerView: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ComponentContainer>
      {children}
      <FloatButton.BackTop type={"primary"} />
    </ComponentContainer>
  );
};

export default GRContainerView;

const ComponentContainer = styled.div`
  background-color: ${Color.white};
  padding: 1.5rem 6rem;
  border-radius: 0.5rem;
  // box-shadow: ${GRStylesConfig.BOX_SHOWDOW};
  // margin-bottom: 0.5rem;
`;
