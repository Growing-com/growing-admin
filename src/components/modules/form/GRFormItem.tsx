import GRCheck from "@component/base/dataEntry/GRCheck";
import GRDatePicker from "@component/base/dataEntry/GRDatePicker";
import GRRadio from "@component/base/dataEntry/GRRadio";
import GRSelect from "@component/base/dataEntry/GRSelect";
import { tOptions } from "@component/base/dataEntry/dataEntryType";
import GRText from "@component/base/text/GRText";
import GRFlexView from "@component/base/view/GRFlexView";
import GRView from "@component/base/view/GRView";
import { ReactNode, forwardRef, useCallback } from "react";
import { Controller, type Control, type FieldValues } from "react-hook-form";
import GRTextInput, { tGRTextInput } from "../../base/text/GRTextInput";

export type tFormItemType =
  | "input"
  | "check"
  | "radio"
  | "select"
  | "custom"
  | "date"
  | "view";

type tGRFormItem = {
  control: Control<FieldValues, any>;
  /**@description FieldPath을 작성 예: user.age 해당 값을 submit에서 보내준다. */
  fieldName: string;
  title: string;
  type?: tFormItemType;
  options?: tOptions;
  customComponent?: ReactNode;
} & tGRTextInput;

// eslint-disable-next-line react/display-name
const GRFormItem = forwardRef<HTMLInputElement, tGRFormItem>(
  ({ control, fieldName, title, ...props }, _ref) => {
    const renderFormItems = useCallback(
      () =>
        // eslint-disable-next-line react/display-name
        () => {
          if (props.type === "input") {
            return <GRTextInput {...props} />;
          }

          if (props.type === "radio") {
            return <GRRadio {...props} onChange={() => {}} />;
          }

          if (props.type === "check") {
            return <GRCheck {...props} onChange={() => {}} />;
          }

          if (props.type === "select") {
            return <GRSelect style={{ flex: 1 }} />;
          }

          if (props.type === "date") {
            return <GRDatePicker />;
          }

          if (props.type === "custom") {
            return <div></div>;
          }

          return <GRView>break</GRView>;
        },
      []
    );

    return (
      <GRFlexView flexDirection={"row"} alignItems={"center"}>
        <GRText marginHorizontal={1} width={4}>
          {title}
        </GRText>
        <Controller
          control={control}
          name={fieldName}
          render={renderFormItems()}
        />
      </GRFlexView>
    );
  }
);

export default GRFormItem;