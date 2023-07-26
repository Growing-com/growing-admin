import { css } from "@emotion/react";
import { CSSProperties, useCallback, useMemo } from "react";
import { Color } from "styles/colors";

export type tGetBorder = {
  borderColor?: CSSProperties["color"];
  bordertop?: CSSProperties["borderTop"];
  borderleft?: CSSProperties["borderLeft"];
  borderright?: CSSProperties["borderRight"];
  borderbottom?: CSSProperties["borderBottom"];
  marginhorizontal?: CSSProperties["borderLeft"];
  marginvertical?: CSSProperties["borderRight"];
  borderWidth?: CSSProperties["width"];
};

const getBorder = ({
  borderColor,
  bordertop,
  borderleft,
  borderright,
  borderbottom,
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

    border-top: ${_borderWidth(bordertop)};
    border-right: ${_borderWidth(borderright)};
    border-bottom: ${_borderWidth(borderbottom)};
    border-left: ${_borderWidth(borderleft)};
  `;
};

export default getBorder;
