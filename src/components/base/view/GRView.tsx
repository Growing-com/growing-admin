import { css } from '@emotion/react';
import type  { CSSProperties, FC, ReactNode } from 'react'
import { Color } from 'styles/colors';
import { getMargin, tGetMargin } from 'utils';

interface IGRView extends tGetMargin {
  children: ReactNode;
  flexDirection?: CSSProperties['flexDirection'];
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
  flexDirection,
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
  const _margin = getMargin(rest);
  
  return (
    <div
      css={[
        css`
          width: ${width ? `${width}rem` : "100%"};
          height: ${height ? `${height}rem` : "100%"};
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
      style={style}
      {...rest}
    >
      {children}
    </div>
  )
}

export default GRView;
