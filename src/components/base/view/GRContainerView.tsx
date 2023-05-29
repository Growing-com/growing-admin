import styled from "@emotion/styled";
import { ReactNode, type FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";

const GRContainerView: FC<{ children: ReactNode }> = ({ children }) => {
  return <ComponentContainer>{children}</ComponentContainer>;
};

export default GRContainerView;

const ComponentContainer = styled.div`
  background-color: ${Color.white};
  padding: 2rem 4rem;
  border-radius: 0.5rem;
  box-shadow: ${GRStylesConfig.BOX_SHOWDOW};
`;
