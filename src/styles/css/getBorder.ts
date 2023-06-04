import { css } from "@emotion/react";
import { CSSProperties, useCallback, useMemo } from "react";
import { Color } from "styles/colors";

export type tGetBorder = {
  borderColor?: CSSProperties["color"];
  borderTop?: CSSProperties["borderTop"];
  borderLeft?: CSSProperties["borderLeft"];
  borderRight?: CSSProperties["borderRight"];
  borderBottom?: CSSProperties["borderBottom"];
  marginHorizontal?: CSSProperties["borderLeft"];
  marginVertical?: CSSProperties["borderRight"];
  borderWidth?: CSSProperties["width"];
};

const getBorder = ({
  borderColor,
  borderTop,
  borderLeft,
  borderRight,
  borderBottom,
  borderWidth
}: tGetBorder) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const _borderWidth = useCallback(
    (_side: CSSProperties["border"]) => (_side ? `${borderWidth}rem` : "0rem"),
    [borderWidth]
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const _borderColor = useMemo(
    () => (borderColor ? borderColor : Color.grey120),
    [borderColor]
  );

  return css`
    border-color: ${_borderColor};
    border-style: solid;

    border-top: ${_borderWidth(borderTop)};
    border-right: ${_borderWidth(borderRight)};
    border-bottom: ${_borderWidth(borderBottom)};
    border-left: ${_borderWidth(borderLeft)};
  `;
};

export default getBorder;
