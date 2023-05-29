import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Input } from "antd";
import { InputProps, TextAreaProps } from "antd/es/input";
import { FC } from "react";
import { getMargin, tGetMargin } from "utils";

const { TextArea } = Input;

export type tGRTextInput = {
  multi?: boolean;
} & InputProps &
  TextAreaProps &
  tGetMargin;

const GRTextInput: FC<tGRTextInput> = ({
  placeholder,
  onChange,
  multi = false,
  ...props
}) => {
  const _margin = getMargin(props);
  const TextInputComponent = multi ? TextAreaComponent : InputComponent;

  return (
    <TextInputComponent
      placeholder={placeholder}
      onChange={onChange}
      css={css`
        ${_margin}
      `}
      {...props}
    />
  );
};

export default GRTextInput;

const InputComponent = styled(Input)`
  display: flex;
  flex: 1;
`;

const TextAreaComponent = styled(TextArea)``;
