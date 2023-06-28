import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Input } from "antd";
import { InputProps, TextAreaProps } from "antd/es/input";
import { ChangeEvent, FC } from "react";
import getMargin, { type tGetMargin } from "styles/css/getMargin";

const { TextArea } = Input;

export type tGRTextInput = {
  multi?: boolean;
  onChange?: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
} & InputProps &
  Omit<TextAreaProps, "onChange"> &
  tGetMargin;

const GRTextInput: FC<tGRTextInput> = ({
  placeholder,
  onChange,
  multi = false,
  ...props
}) => {
  const _margin = getMargin(props);
  const TextInputComponent = multi ? TextAreaComponent : InputComponent;

  const onChangeText = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    onChange?.(e);
  };
  return (
    <TextInputComponent
      placeholder={placeholder}
      onChange={onChangeText}
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
