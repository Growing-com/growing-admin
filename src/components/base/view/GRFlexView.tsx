import { css } from '@emotion/react';
import React, { CSSProperties, FC, ReactNode } from 'react'
import { Color } from 'styles/colors';

interface IGRFlexView {
  children: ReactNode;
  isRow?: boolean;
  backgroundColor?: CSSProperties['backgroundColor'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems']
  isBoard?: boolean;
  padding?: CSSProperties['padding'];
}

const GRFlexView: FC<IGRFlexView> = ({
  children,
  isRow,
  backgroundColor,
  justifyContent,
  alignItems,
  isBoard,
  padding,
  ...rest
}) => {
  return (
    <div
      css={[css`
          display: flex;
          flex-direction: ${isRow ? "row" : "colum"};
          background-color: ${backgroundColor};
          justify-content: ${justifyContent};
          align-items: ${alignItems};
          padding: ${padding}
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
