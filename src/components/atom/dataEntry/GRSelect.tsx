import { css } from "@emotion/react";
import type { SelectProps } from "antd";
import { Select } from "antd";
import { CSSProperties } from "react";
import { Color } from "styles/colors";
import { AreaType } from "styles/css";
import getMargin from "styles/css/getMargin";
import GRText from "../text/GRText";
import { tOptions } from "./type";

export type tGRSelect = {
  options?: tOptions[];
  height?: CSSProperties["height"];
  width?: CSSProperties["width"];
} & Omit<SelectProps, "options"> &
  AreaType;

const { Option } = Select;

const GRSelect = ({ options, mode, height, width, ...props }: tGRSelect) => {
  const _margin = getMargin(props);
  return (
    <Select
      mode={mode}
      css={css`
        width: ${width}rem;
        height: ${height}rem;
        ${_margin};
      `}
      listItemHeight={10}
      listHeight={100}
      {...props}
    >
      {options?.map((option, index) => (
        <Option key={`${option.label}_${index}`} value={option.value}>
          <GRText color={Color.grey60}>{option.label}</GRText>
        </Option>
      ))}
    </Select>
  );
};

export default GRSelect;
