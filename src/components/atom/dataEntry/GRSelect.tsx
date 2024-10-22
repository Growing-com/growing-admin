import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { SelectProps } from "antd";
import { Select } from "antd";
import type { BaseSelectRef } from "rc-select";
import { CSSProperties, forwardRef } from "react";
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

const GRSelect = forwardRef<BaseSelectRef, tGRSelect>(
  (
    { options, mode, height, width, allowClear = true, ...props }: tGRSelect,
    ref
  ) => {
    const _margin = getMargin(props);
    return (
      <SelectCompo
        ref={ref}
        mode={mode}
        css={css`
          width: ${width}rem;
          height: ${height}rem;
          ${_margin};
        `}
        options={options}
        listItemHeight={10}
        listHeight={100}
        allowClear={allowClear}
        {...props}
      />
    );
  }
);

export default GRSelect;

const SelectCompo = styled(
  forwardRef<BaseSelectRef, tGRSelect>(({ ...props }: tGRSelect, ref) => (
    <Select {...props} ref={ref} />
  ))
)`
  .ant-select-selector {
    align-items: center !important;
  }
`;
