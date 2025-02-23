import { CSSProperties } from "react";

type tGRStylesConfig = {
  BASE_SMALL_MARGIN: number;
  BASE_MARGIN: number;
  BASE_LONG_MARGIN: number;
  FORM_BLOCK_BASE_MARGIN : number;
  BASE_PADDING: number;
  BASE_LONG_PADDING: number;
  HORIZONTAL_PADDING: number;
  BASE_RADIUS: number;
  BOX_SHOWDOW: CSSProperties["boxShadow"];
  BOX_GREEN_SHOWDOW: CSSProperties["boxShadow"];
  COLLAPSED_WIDTH: number | string;
};
const GRStylesConfig: tGRStylesConfig = {
  BASE_SMALL_MARGIN: 0.3,
  BASE_MARGIN: 0.5,
  BASE_LONG_MARGIN: 1,
  FORM_BLOCK_BASE_MARGIN : 2,
  BASE_PADDING: 0.3,
  BASE_LONG_PADDING: 1,
  HORIZONTAL_PADDING: 2,
  BASE_RADIUS: 0.5,
  BOX_SHOWDOW: "2px 4px 12px rgba(0,0,0,.08)",
  BOX_GREEN_SHOWDOW: "2px 4px 12px rgba(32, 200, 149,.3)",
  COLLAPSED_WIDTH: "5rem"
};

export default GRStylesConfig;
