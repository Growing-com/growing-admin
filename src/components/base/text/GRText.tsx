import styled from '@emotion/styled';
import React, { FC, ReactNode } from 'react'
interface IGRText {
  children: ReactNode;
}
const GRText: FC<IGRText> = ({
  children
}) => {
  return (
    <TextComponent>
      {children}
    </TextComponent>
  )
}

export default GRText

const TextComponent = styled.div`
`