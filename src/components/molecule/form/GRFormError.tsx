import GRText from "@component/atom/text/GRText";
import { FC, useMemo } from "react";
import { FieldValues, UseFormStateReturn } from "react-hook-form";
import { Color } from "styles/colors";

type tGRFormError = {
  fieldName: string;
  formState: UseFormStateReturn<FieldValues>;
};
const DEFAULT_ERROR_MESSAGE = "필수 정보입니다" as string;

const GRFormError: FC<tGRFormError> = ({ fieldName, formState }) => {
  const renderErrorText = useMemo(() => {
    if (formState.errors[fieldName]?.type === "required") {
      return formState?.errors[fieldName]?.message !== ""
        ? formState?.errors[fieldName]?.message
        : DEFAULT_ERROR_MESSAGE;
    }
    return "";
  }, [fieldName, formState.errors]);

  return (
    <GRText fontSize={"b10"} color={Color.red100}>
      <>{renderErrorText}</>
    </GRText>
  );
};

export default GRFormError;
