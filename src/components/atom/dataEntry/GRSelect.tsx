import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { SelectProps } from "antd";
import { Select } from "antd";
import { CSSProperties } from "react";
import { AreaType } from "styles/css";
import getMargin from "styles/css/getMargin";
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
    <SelectCompo
      mode={mode}
      css={css`
        width: ${width}rem;
        height: ${height}rem;
        ${_margin};
      `}
      options={options}
      listItemHeight={10}
      listHeight={100}
      {...props}
    />
  );
};

export default GRSelect;

const SelectCompo = styled(({ ...props }: tGRSelect) => <Select {...props} />)`
  .ant-select-selector {
    align-items: center !important;
  }
`;
