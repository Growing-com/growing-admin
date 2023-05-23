import styled from '@emotion/styled';
import React, { ReactNode, type FC } from 'react'
import { Color } from 'styles/colors';

const GRContainerView : FC<{ children: ReactNode }> = ({
    children
}) => {
  return (
    <ComponentContainer>{children}</ComponentContainer>
  )
}

export default GRContainerView;

const ComponentContainer = styled.div`
  background-color: ${Color.white};
  padding: 2rem;
  border-radius: 0.5rem;
`