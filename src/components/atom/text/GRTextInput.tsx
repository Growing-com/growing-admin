import { css } from "@emotion/react";
import { Input } from "antd";
import { InputProps, TextAreaProps } from "antd/es/input";
import { CSSProperties, ChangeEvent, ForwardedRef, forwardRef, useMemo } from "react";
import getMargin, { type tGetMargin } from "styles/css/getMargin";
import {
  REGEXP_NUM,
  REGEXP_PHONE_NUM,
  REGEXP_PHONE_PATTERN
} from "utils/regexp";

export type tGRTextInputType =
  | "input"
  | "password"
  | "textarea"
  | "name"
  | "number"
  | "phoneNumber";

export type tGRTextInput = {
  onChange?: (value: string) => void;
  type?: tGRTextInputType;
  height?: CSSProperties["height"];
} & Omit<InputProps, "type" | "onChange"> &
  Omit<TextAreaProps, "onChange"> &
  tGetMargin;

const PHONE_NUM_LEN = 13;
const GRTextInput = (
  { placeholder, type = "input", onChange, value, height, ...props }: tGRTextInput,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _ref: ForwardedRef<HTMLDivElement>
) => {
  const _margin = getMargin(props);
  const _maxLen = useMemo(
    () => (type === "phoneNumber" ? PHONE_NUM_LEN : props.maxLength),
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

  const renderValue = (
    _value?: string | number | bigint | readonly string[] | undefined
  ) => {
    if (typeof _value === "string" && type === "name") {
      return _value.replace(/\s+/g, "");
    } else if (
      typeof _value === "string" &&
      type === "phoneNumber" &&
      _value?.length === 11
    ) {
      return _value.replace(REGEXP_PHONE_PATTERN, "$1-$2-$3");
    } else if (
      typeof _value === "string" &&
      type === "phoneNumber" &&
      _value?.length === 13
    ) {
      return (
        _value
          //하이픈이 입력되면 공백으로 변경되고 하이픈이 다시 생성됨
          .replace(/-/g, "")
          .replace(REGEXP_PHONE_PATTERN, "$1-$2-$3")
      );
    } else if (
      typeof _value === "string" &&
      type === "phoneNumber" &&
      _value?.length < 13
    ) {
      return _value.replace(/-/g, "");
    }
    return _value ?? "";
  };

  const onChangeText = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (
      (type === "phoneNumber" || type === "number") &&
      e.target.value &&
      !REGEXP_PHONE_NUM.test(e.target.value)
    ) {
      return;
    }
    if (
      type === "number" &&
      e.target.value &&
      !REGEXP_NUM.test(e.target.value)
    ) {
      return;
    }

    onChange?.(String(renderValue(e.target.value)));
  };

  return (
    <TextInputComponent
      placeholder={placeholder}
      onChange={onChangeText}
      value={renderValue(value)}
      maxLength={_maxLen}
      css={css`
        height: ${`${height}rem`};
        ${_margin}
      `}
      {...props}
    />
  );
};

export default forwardRef(GRTextInput);
