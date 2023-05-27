import { SerializedStyles, css } from '@emotion/react';
import type  { CSSProperties, FC, ReactNode } from 'react'
import { Color } from 'styles/colors';
import { getMargin, tGetMargin } from 'utils';

export type tGRView = {
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
  customCss?: SerializedStyles; 
} & tGetMargin

const GRView: FC<tGRView> = ({
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
  customCss,
  ...rest
}) => {
  const _margin = getMargin(rest);
  
  return (
    <div
      css={[
        css`
          width: ${`${width}rem`};
          height: ${`${height}rem`};
          flex-direction: ${flexDirection};
          background-color: ${backgroundColor};
          justify-content: ${justifyContent};
          align-items: ${alignItems};
          padding: ${padding}rem;
          ${_margin}
        `,
        isBoard && css`
          border: 0.1rem solid ${Color.green200};
          border-radius: 1rem;
        `,
        customCss
      ]}
      style={style}
      {...rest}
    >
      {children}
    </div>
  )
}

export default GRView;
