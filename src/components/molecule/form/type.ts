import { tPickerType } from "@component/atom/dataEntry/GRDatePicker";
import { tOptions } from "@component/atom/dataEntry/type";
import { tGRTextInputType } from "@component/atom/text/GRTextInput";
import { CSSProperties, ReactNode } from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormStateReturn,
  type Control,
  type FieldValues
} from "react-hook-form";

export type tFormItemType =
  | "check"
  | "radio"
  | "select"
  | "switch"
  | "custom"
  | "date"
  | "view"
  | "text";

export type tGRFormItem = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
  /**@description FieldPath을 작성 예: user.age 해당 값을 submit에서 보내준다. */
  fieldName: string;
  title?: string;
  type: tFormItemType;
  options?: tOptions[];
  customComponent?: ReactNode;
  /** @description register options */
  required?: boolean;
  style?: CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  isShow?: boolean;
  pickerType?: tPickerType;
  textType?: tGRTextInputType;
  mode?: "multiple";
  maxLength?: number;
  defaultValue?: any;
};

export type tRenderProps = {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
};
