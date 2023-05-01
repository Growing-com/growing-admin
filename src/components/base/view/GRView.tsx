import { css } from '@emotion/react';
import type  { CSSProperties, FC, ReactNode } from 'react'
import { Color } from 'styles/colors';

interface IGRView {
  children: ReactNode;
  isRow?: boolean;
  backgroundColor?: CSSProperties['backgroundColor'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems']
  isBoard?: boolean;
  padding?: CSSProperties['padding'];
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  style?: CSSProperties,
}

const GRView: FC<IGRView> = ({
  children,
  isRow,
  backgroundColor,
  justifyContent = "center",
  alignItems = "center",
  isBoard,
  padding,
  width,
  height,
  style,
  ...rest
}) => {
  return (
    <div
      css={[
        css`
          width: ${width}rem;
          height: ${height}rem;
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
      style={style}
      {...rest}
    >
      {children}
    </div>
  )
}

export default GRView;
