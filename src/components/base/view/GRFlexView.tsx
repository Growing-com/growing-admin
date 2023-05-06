import { css } from '@emotion/react';
import type  { CSSProperties, FC, ReactNode } from 'react'
import { Color } from 'styles/colors';
import { getMargin, tGetMargin } from 'utils';

interface IGRFlexView extends tGetMargin {
  children: ReactNode;
  flexDirection?: "column" | "row";
  backgroundColor?: CSSProperties['backgroundColor'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems']
  isBoard?: boolean;
  padding?: CSSProperties['padding'];
} 

const GRFlexView: FC<IGRFlexView> = ({
  children,
  flexDirection = "column",
  backgroundColor,
  justifyContent,
  alignItems,
  isBoard,
  padding,
  ...rest
}) => {
  const _margin = getMargin(rest);

  return (
    <div
      css={[
        css`
          display: flex;
          flex:1;
          flex-direction: ${flexDirection};
          background-color: ${backgroundColor};
          justify-content: ${justifyContent};
          align-items: ${alignItems};
          padding: ${padding};
          ${_margin}
        `,
        isBoard && css`
          border: 0.1rem solid ${Color.grey100};
          border-radius: 1rem;
        `
      ]}
      {...rest}
    >
      {children}
    </div>
  )
}

export default GRFlexView;
