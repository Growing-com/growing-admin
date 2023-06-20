import { css } from "@emotion/react";
import { CSSProperties } from "react";

export type tGetPadding = {
  padding?: CSSProperties["padding"];
  paddingtop?: CSSProperties["paddingTop"];
  paddingright?: CSSProperties["paddingRight"];
  paddingbottom?: CSSProperties["paddingBottom"];
  paddingleft?: CSSProperties["paddingLeft"];
  paddinghorizontal?: CSSProperties["paddingRight"];
  paddingvertical?: CSSProperties["paddingBottom"];
};

const getPadding = ({
  padding,
  paddingtop,
  paddingright,
  paddingbottom,
  paddingleft,
  paddinghorizontal,
  paddingvertical
}: tGetPadding) => {
  if (padding) {
    return css`
      padding: ${padding}rem;
    `;
  }
  if (paddinghorizontal) {
    paddingright = paddinghorizontal;
    paddingleft = paddinghorizontal;
  }
  if (paddingvertical) {
    paddingtop = paddingvertical;
    paddingbottom = paddingvertical;
  }

  return css`
    padding-top: ${paddingtop}rem;
    padding-bottom: ${paddingbottom}rem;
    padding-right: ${paddingright}rem;
    padding-left: ${paddingleft}rem;
  `;
};

export default getPadding;
