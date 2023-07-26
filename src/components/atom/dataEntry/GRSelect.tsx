import { css } from "@emotion/react";
import type { SelectProps } from "antd";
import { Select } from "antd";
import { CSSProperties, ForwardedRef, forwardRef } from "react";
import { Color } from "styles/colors";
import { AreaType } from "styles/css";
import getMargin from "styles/css/getMargin";
import GRText from "../text/GRText";
import { tOptions } from "./dataEntryType";

export type tGRSelect = {
  options?: tOptions;
  height?: CSSProperties["height"];
  width?: CSSProperties["width"];
} & Omit<SelectProps, "options"> &
  AreaType;

const { Option } = Select;

const GRSelect = (
  { options, mode, height, width, ...props }: tGRSelect,
  _ref: ForwardedRef<HTMLDivElement>
) => {
  // loading 페이지 개발 후 적용 필요
  if (!options?.length) {
    return <></>;
  }
  const _margin = getMargin(props);
  return (
    <Select
      mode={mode}
      css={css`
        display: flex;
        width: ${width}rem;
        height: ${height}rem;
        ${_margin};
      `}
      {...props}
    >
      {options.map((option, index) => (
        <Option key={`${option.label}_${index}`} value={option.value}>
          <GRText color={Color.grey60}>{option.label}</GRText>
        </Option>
      ))}
    </Select>
  );
};

export default forwardRef(GRSelect);
