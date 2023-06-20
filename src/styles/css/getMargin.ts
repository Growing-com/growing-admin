import { css } from "@emotion/react";
import { CSSProperties } from "react";

export type tGetMargin = {
  margin?: CSSProperties["margin"];
  margintop?: CSSProperties["marginTop"];
  marginright?: CSSProperties["marginRight"];
  marginbottom?: CSSProperties["marginBottom"];
  marginleft?: CSSProperties["marginLeft"];
  marginhorizontal?: CSSProperties["marginRight"];
  marginvertical?: CSSProperties["marginBottom"];
};

const getMargin = ({
  margin,
  margintop,
  marginright,
  marginbottom,
  marginleft,
  marginhorizontal,
  marginvertical
}: tGetMargin) => {
  if (margin) {
    return css`
      margin: ${margin}rem;
    `;
  }
  if (marginhorizontal) {
    marginright = marginhorizontal;
    marginleft = marginhorizontal;
  }
  if (marginvertical) {
    margintop = marginvertical;
    marginbottom = marginvertical;
  }

  return css`
    margin-top: ${margintop}rem;
    margin-bottom: ${marginbottom}rem;
    margin-right: ${marginright}rem;
    margin-left: ${marginleft}rem;
  `;
};

export default getMargin;
