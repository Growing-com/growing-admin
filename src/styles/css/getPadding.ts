import { css } from "@emotion/react";
import { CSSProperties } from "react";

export type tGetPadding = {
  padding?: CSSProperties["padding"];
  paddingTop?: CSSProperties["paddingTop"];
  paddingRight?: CSSProperties["paddingRight"];
  paddingBottom?: CSSProperties["paddingBottom"];
  paddingLeft?: CSSProperties["paddingLeft"];
  paddingHorizontal?: CSSProperties["paddingRight"];
  paddingVertical?: CSSProperties["paddingBottom"];
};

const getPadding = ({
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  paddingHorizontal,
  paddingVertical
}: tGetPadding) => {
  if (padding) {
    return css`
      padding: ${padding}rem;
    `;
  }
  if (paddingHorizontal) {
    paddingRight = paddingHorizontal;
    paddingLeft = paddingHorizontal;
  }
  if (paddingVertical) {
    paddingTop = paddingVertical;
    paddingBottom = paddingVertical;
  }

  return css`
    padding-top: ${paddingTop}rem;
    padding-bottom: ${paddingBottom}rem;
    padding-right: ${paddingRight}rem;
    padding-left: ${paddingLeft}rem;
  `;
};

export default getPadding;
