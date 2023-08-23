import GRTextInput, { tGRTextInput } from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import { CSSProperties, useCallback } from "react";
import { Control, Controller } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";
import GRFormError from "./GRFormError";
import GRFormTitle from "./GRFormTitle";
import type { tRenderProps } from "./type";

export type tGRFormInputText = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
  /**@description FieldPath을 작성 예: user.age 해당 값을 submit에서 보내준다. */
  fieldName: string;
  title?: string;
  /** @description register options */
  required?: boolean;
  style?: CSSProperties;
} & tGRTextInput;

const GRFormInputText = ({
  control,
  fieldName,
  title,
  required = false,
  style,
  type,
  ...props
}: tGRFormInputText) => {
  const renderFormItems = useCallback(
    ({ field, formState }: tRenderProps) => {
      return (
        <GRFlexView>
          <GRTextInput type={type} {...field} {...props} />
          <GRFormError fieldName={field.name} formState={formState} />
        </GRFlexView>
      );
    },
    [props, type]
  );

  return (
    <GRFlexView
      flexDirection={"row"}
      alignItems={"center"}
      style={style}
      marginvertical={GRStylesConfig.BASE_MARGIN}
    >
      <GRFormTitle title={title} required={required} />
      <Controller
        control={control}
        name={fieldName}
        rules={{ required: required }}
        render={renderFormItems}
      />
    </GRFlexView>
  );
};

export default GRFormInputText;
