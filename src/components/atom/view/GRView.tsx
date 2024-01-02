import { SerializedStyles, css } from "@emotion/react";
import type { CSSProperties, FC, ReactNode } from "react";
import { Color } from "styles/colors";
import getBorder, { tGetBorder } from "styles/css/getBorder";
import getMargin, { type tGetMargin } from "styles/css/getMargin";
import getPadding, { tGetPadding } from "styles/css/getPadding";

export type tGRView = {
  children: ReactNode;
  flexDirection?: CSSProperties["flexDirection"];
  backgroundColor?: CSSProperties["backgroundColor"];
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  isBoard?: boolean;
  padding?: CSSProperties["padding"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  style?: CSSProperties;
  customCss?: SerializedStyles;
  onClick?: () => void;
  isFlex?: boolean;
  borderRadius?: number;
} & tGetMargin &
  tGetBorder &
  tGetPadding;

const GRView: FC<tGRView> = ({
  children,
  flexDirection,
  backgroundColor,
  justifyContent,
  alignItems,
  isBoard,
  padding,
  width,
  height,
  style,
  customCss,
  isFlex,
  borderRadius,
  ...rest
}) => {
  const _margin = getMargin(rest);
  const _border = getBorder(rest);
  const _padding = getPadding(rest);

  return (
    <div
      css={[
        css`
          width: ${`${width}rem`};
          height: ${`${height}rem`};
          flex-direction: ${flexDirection};
          background-color: ${backgroundColor};
          padding: ${padding}rem;
          border-radius: ${borderRadius}rem;
          ${_margin}
          ${_border}
          ${_padding}
        `,
        isFlex &&
          css`
            display: flex;
            justify-content: ${justifyContent};
            align-items: ${alignItems};
          `,
        isBoard &&
          css`
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
  );
};

export default GRView;
