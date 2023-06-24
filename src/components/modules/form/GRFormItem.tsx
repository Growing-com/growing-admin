import GRCheck from "@component/base/dataEntry/GRCheck";
import GRDatePicker from "@component/base/dataEntry/GRDatePicker";
import GRRadio from "@component/base/dataEntry/GRRadio";
import GRSelect from "@component/base/dataEntry/GRSelect";
import GRSwitch from "@component/base/dataEntry/GRSwitch";
import { tOptions } from "@component/base/dataEntry/dataEntryType";
import GRText from "@component/base/text/GRText";
import GRFlexView from "@component/base/view/GRFlexView";
import GRView from "@component/base/view/GRView";
import { CSSProperties, ReactNode, forwardRef, useCallback } from "react";
import { Controller, type Control, type FieldValues } from "react-hook-form";
import GRTextInput from "../../base/text/GRTextInput";

export type tFormItemType =
  | "input"
  | "check"
  | "radio"
  | "select"
  | "switch"
  | "custom"
  | "date"
  | "view"
  | "textarea";

type tGRFormItem = {
  control: Control<FieldValues, unknown>;
  /**@description FieldPath을 작성 예: user.age 해당 값을 submit에서 보내준다. */
  fieldName: string;
  title?: string;
  type?: tFormItemType;
  options?: tOptions;
  customComponent?: ReactNode;
  /** @description register options */
  required?: boolean;
  style?: CSSProperties;
};

// eslint-disable-next-line react/display-name
const GRFormItem = forwardRef<HTMLInputElement, tGRFormItem>(
  (
    {
      control,
      fieldName,
      title,
      required = true,
      style,
      type,
      options,
      customComponent,
      ...props
    },
    _ref
  ) => {
    const renderFormItems = useCallback(() => {
      if (type === "input" || type === "textarea") {
        return <GRTextInput multi={type === "textarea"} {...props} />;
      }
      if (type === "radio") {
        return (
          <GRRadio
            {...props}
            options={options}
            onChange={() => {
              console.log("GRRadio");
            }}
          />
        );
      }

      if (type === "check") {
        return (
          <GRCheck
            {...props}
            onChange={() => {
              console.log("GRCheck");
            }}
          />
        );
      }

      if (type === "select") {
        return <GRSelect style={{ flex: 1 }} options={options} {...props} />;
      }

      if (type === "switch") {
        return <GRSwitch {...props} />;
      }

      if (type === "date") {
        return <GRDatePicker style={{ flex: 1 }} />;
      }

      if (type === "custom") {
        return <div></div>;
      }

      return <GRView>break</GRView>;
    }, [options, props, type]);

    return (
      <GRFlexView flexDirection={"row"} alignItems={"center"} style={style}>
        {title && (
          <GRText margin={1} width={4} weight={"bold"}>
            {title ?? ""}
          </GRText>
        )}
        <Controller
          control={control}
          name={fieldName}
          render={renderFormItems}
          rules={{ required: required }}
        />
      </GRFlexView>
    );
  }
);

export default GRFormItem;
