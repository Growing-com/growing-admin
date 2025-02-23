import GRText from "@component/atom/text/GRText";
import { FC } from "react";
import { FieldValues, UseFormStateReturn } from "react-hook-form";
import { Color } from "styles/colors";

type tGRFormError = {
  fieldName: string;
  formState: UseFormStateReturn<FieldValues>;
};
const DEFAULT_ERROR_MESSAGE = "필수 정보입니다" as string;

const GRFormError: FC<tGRFormError> = ({ fieldName, formState }) => {
  if (formState.errors[fieldName]?.type !== "required" && formState.errors[fieldName]?.type !== "pattern") return <></>;
  return (
    <GRText fontSize={"b7"} color={Color.red100}>
      {!!formState?.errors[fieldName]?.message
        ? formState?.errors[fieldName]?.message?.toString()
        : DEFAULT_ERROR_MESSAGE}
    </GRText>
  );
};

export default GRFormError;
