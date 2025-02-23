import GRCheck from "@component/atom/dataEntry/GRCheck";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRRadio from "@component/atom/dataEntry/GRRadio";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRSwitch from "@component/atom/dataEntry/GRSwitch";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import React, { useCallback } from "react";
import { Controller } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";
import GRFormError from "./GRFormError";
import GRFormTitle from "./GRFormTitle";
import { tGRFormItem, tRenderProps } from "./type";

// eslint-disable-next-line react/display-name
const GRFormItem = ({
  control,
  fieldName,
  title,
  required = false,
  containStyle,
  type,
  options,
  disabled,
  isShow = true,
  textType,
  pickerType,
  defaultValue,
  ...props
}: tGRFormItem) => {
  const renderFormItems = useCallback(
    ({ field, formState }: tRenderProps) => {
      let formItemComponent;

      if (type === "radio") {
        formItemComponent = (
          <GRRadio
            options={options}
            disabled={disabled}
            {...field}
            {...props}
          />
        );
      }

      if (type === "check") {
        formItemComponent = <GRCheck {...props} {...field} />;
      }

      if (type === "select") {
        formItemComponent = (
          <GRSelect
            options={options}
            disabled={disabled}
            {...field}
            {...props}
          />
        );
      }

      if (type === "switch") {
        formItemComponent = (
          <GRView>
            <GRSwitch {...field} {...props} checked={field.value} />
          </GRView>
        );
      }

      if (type === "date") {
        formItemComponent = (
          <GRDatePicker
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            pickerType={pickerType}
            style={{ flex: 1 }}
            disabled={disabled}
            {...field}
            {...props}
          />
        );
      }

      if (type === "text") {
        formItemComponent = (
          <GRTextInput
            type={textType}
            {...field}
            {...props}
            disabled={disabled}
          />
        );
      }

      if (type === "custom") {
        formItemComponent = <div {...field} {...props}></div>;
      }

      if (type)
        return (
          <GRFlexView justifyContent={"center"}>
            {formItemComponent}
            <GRFormError fieldName={field.name} formState={formState} />
          </GRFlexView>
        );
      return <></>;
    },
    [type, props, options, disabled, pickerType, textType]
  );
  if (!isShow) return <React.Fragment />;
  return (
    <GRFlexView
      flexDirection={"row"}
      alignItems={"center"}
      marginbottom={GRStylesConfig.BASE_MARGIN}
      style={containStyle}
    >
      {title && <GRFormTitle title={title} required={required} />}
      <Controller
        control={control}
        name={fieldName}
        render={renderFormItems}
        rules={{ required: required }}
        defaultValue={defaultValue}
      />
    </GRFlexView>
  );
};

export default GRFormItem;
