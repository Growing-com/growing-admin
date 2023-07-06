import GRTextInput, { tGRTextInput } from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import { CSSProperties, forwardRef, useCallback } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import GRFormTitle from "./GRFormTitle";
import type { tRenderProps } from "./type";

export type tGRFormInputText = {
  control: Control<FieldValues, unknown>;
  /**@description FieldPath을 작성 예: user.age 해당 값을 submit에서 보내준다. */
  fieldName: string;
  title?: string;
  /** @description register options */
  required?: boolean;
  style?: CSSProperties;
} & tGRTextInput;

// eslint-disable-next-line react/display-name
const GRFormInputText = forwardRef<HTMLInputElement, tGRFormInputText>(
  (
    { control, fieldName, title, required = false, style, type, ...props },
    _ref
  ) => {
    const renderFormItems = useCallback(
      ({ field }: tRenderProps) => {
        return <GRTextInput type={type} {...field} {...props} />;
      },
      [props, type]
    );

    return (
      <GRFlexView flexDirection={"row"} alignItems={"center"} style={style}>
        <GRFormTitle title={title} />
        <Controller
          control={control}
          name={fieldName}
          rules={{ required: required }}
          render={renderFormItems}
        />
      </GRFlexView>
    );
  }
);

export default GRFormInputText;
