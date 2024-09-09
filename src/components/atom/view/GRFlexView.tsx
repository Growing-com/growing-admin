import { SerializedStyles, css } from "@emotion/react";
import type { CSSProperties, FC, HTMLAttributes, ReactNode } from "react";
import { Color } from "styles/colors";
import { AreaType } from "styles/css";
import getMargin from "styles/css/getMargin";
import getPadding from "styles/css/getPadding";

type tGRFlexView = {
  children: ReactNode;
  flexDirection?: "column" | "row";
  backgroundColor?: CSSProperties["backgroundColor"];
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  isBoard?: boolean;
  padding?: CSSProperties["padding"];
  borderRadius?: CSSProperties["borderRadius"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  style?: CSSProperties;
  css?: SerializedStyles;
  flex?: number;
} & AreaType &
  HTMLAttributes<HTMLDivElement>;

const GRFlexView: FC<tGRFlexView> = ({
  children,
  flexDirection = "column",
  backgroundColor,
  justifyContent,
  alignItems,
  isBoard,
  padding,
  borderRadius,
  width,
  height,
  css: customCss,
  style,
  flex = 1,
  ...rest
}) => {
  const _margin = getMargin(rest);
  const _padding = getPadding(rest);

  return (
    <div
      css={[
        css`
          display: flex;
          flex: ${flex};
          flex-direction: ${flexDirection};
          background-color: ${backgroundColor};
          justify-content: ${justifyContent};
          align-items: ${alignItems};
          padding: ${padding ? `${padding}rem` : 0};
          border-radius: ${borderRadius}rem;
          width: ${`${width}rem`};
          height: ${`${height}rem`};
          ${_margin}
          ${_padding}
        `,
        isBoard &&
          css`
            border: 0.1rem solid ${Color.grey100};
            border-radius: 0.5rem;
          `,
        { customCss }
      ]}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};

export default GRFlexView;
