import { css } from "@emotion/react";
import { Input } from "antd";
import { InputProps, TextAreaProps } from "antd/es/input";
import { ChangeEvent, ForwardedRef, forwardRef, useMemo } from "react";
import getMargin, { type tGetMargin } from "styles/css/getMargin";
import { REGEXP_PHONE_NUM, REGEXP_PHONE_PATTERN } from "utils/regexp";

export type tGRTextInput = {
  onChange?: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  type?: "input" | "password" | "textarea" | "number" | "phonenumber";
} & Omit<InputProps, "type"> &
  Omit<TextAreaProps, "onChange"> &
  tGetMargin;

const PHONE_NUM_LEN = 13;
const GRTextInput = (
  { placeholder, type = "input", onChange, value, ...props }: tGRTextInput,
  _ref: ForwardedRef<HTMLDivElement>
) => {
  const _margin = getMargin(props);
  const _maxLen = useMemo(
    () => (type === "phonenumber" ? PHONE_NUM_LEN : props.maxLength),
    [props.maxLength, type]
  );

  const TextInputComponent = useMemo(() => {
    switch (type) {
      case "password":
        return Input.Password;
      case "textarea":
        return Input.TextArea;
      default:
        return Input;
    }
  }, [type]);

  const onChangeText = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (
      (type === "phonenumber" || type === "number") &&
      e.target.value &&
      !REGEXP_PHONE_NUM.test(e.target.value)
    ) {
      confirm("숫자만 가능합니다.");
      return;
    }

    onChange?.(e);
  };

  const renderValue = (
    _value?: string | number | readonly string[] | undefined
  ) => {
    if (
      typeof _value === "string" &&
      type === "phonenumber" &&
      _value?.length === 11
    ) {
      return _value.replace(REGEXP_PHONE_PATTERN, "$1-$2-$3");
    } else if (
      typeof _value === "string" &&
      type === "phonenumber" &&
      _value?.length === 13
    ) {
      return (
        _value
          //하이픈이 입력되면 공백으로 변경되고 하이픈이 다시 생성됨
          .replace(/-/g, "")
          .replace(REGEXP_PHONE_PATTERN, "$1-$2-$3")
      );
    }
    return _value ?? "";
  };

  return (
    <TextInputComponent
      placeholder={placeholder}
      onChange={onChangeText}
      value={renderValue(value)}
      maxLength={_maxLen}
      css={css`
        display: flex;
        flex: 1;
        ${_margin}
      `}
      {...props}
    />
  );
};

export default forwardRef(GRTextInput);
