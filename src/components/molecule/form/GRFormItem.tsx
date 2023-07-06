import GRCheck from "@component/atom/dataEntry/GRCheck";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRRadio from "@component/atom/dataEntry/GRRadio";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRSwitch from "@component/atom/dataEntry/GRSwitch";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { forwardRef, useCallback } from "react";
import { Controller } from "react-hook-form";
import GRFormTitle from "./GRFormTitle";
import { tGRFormItem, tRenderProps } from "./type";

// eslint-disable-next-line react/display-name
const GRFormItem = forwardRef<HTMLInputElement, tGRFormItem>(
  (
    {
      control,
      fieldName,
      title,
      required = false,
      style,
      type,
      options,
      disabled,
      ...props
    },
    _ref
  ) => {
    const renderFormItems = useCallback(
      ({ field }: tRenderProps) => {
        let formItemComponent;

        if (type === "radio") {
          formItemComponent = (
            <GRRadio {...props} options={options} {...field} />
          );
        }

        if (type === "check") {
          formItemComponent = (
            <GRCheck
              {...props}
              {...field}
              onChange={() => {
                console.log("GRCheck");
              }}
            />
          );
        }

        if (type === "select") {
          formItemComponent = (
            <GRSelect
              style={{ flex: 1 }}
              options={options}
              disabled={disabled}
              {...props}
              {...field}
            />
          );
        }

        if (type === "switch") {
          formItemComponent = (
            <GRView>
              <GRSwitch {...props} {...field} />
            </GRView>
          );
        }

        if (type === "date") {
          formItemComponent = (
            <GRDatePicker style={{ flex: 1 }} {...props} {...field} />
          );
        }

        if (type === "custom") {
          formItemComponent = <div></div>;
        }

        return (
          <GRFlexView>
            {formItemComponent}
            {/* <GRFormError fieldName={field.name} formState={formState} /> */}
          </GRFlexView>
        );
      },
      [type, props, options]
    );

    return (
      <GRFlexView flexDirection={"row"} alignItems={"center"} style={style}>
        <GRFormTitle title={title} />
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
