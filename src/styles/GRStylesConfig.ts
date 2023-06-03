import { CSSProperties } from "react";

type tGRStylesConfig = {
  BASE_MARGIN: number;
  BASE_PADDING: number;
  BOX_SHOWDOW: CSSProperties["boxShadow"];
  BOX_GREEN_SHOWDOW: CSSProperties["boxShadow"];
};
const GRStylesConfig: tGRStylesConfig = {
  BASE_MARGIN: 0.5,
  BASE_PADDING: 0.3,
  BOX_SHOWDOW: "2px 4px 12px rgba(0,0,0,.08)",
  BOX_GREEN_SHOWDOW: "2px 4px 12px rgba(32, 200, 149,.3)"
};

export default GRStylesConfig;
