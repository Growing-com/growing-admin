import { css } from "@emotion/react";
import { DatePicker, type DatePickerProps } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { PickerComponentClass } from "antd/es/date-picker/generatePicker/interface";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko"; // 한국어 locale 추가
import { CSSProperties, FC, useCallback, useMemo, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";
import GRButtonText from "../button/GRTextButton";
import GRFlexView from "../view/GRFlexView";
import locale from "antd/lib/date-picker/locale/ko_KR";

dayjs.locale("ko");

const { RangePicker } = DatePicker;

export type tPickerType = "basic" | "range" | "month";

type tGRDatePicker<T extends tPickerType> = {
  height?: CSSProperties["height"];
  width?: CSSProperties["width"];
  onChange?: (date: Dayjs | null) => void;
  pickerType: T;
} & (T extends "basic"
  ? { pickerType: T } & Omit<DatePickerProps, "onChange">
  : { pickerType: T } & RangePickerProps);

const GRDatePicker: FC<tGRDatePicker<tPickerType>> = ({
  height,
  width,
  format,
  onChange,
  picker,
  pickerType,
  ...props
}) => {
  const BaseDatePicker = useMemo(
    () =>
      (pickerType === "basic"
        ? DatePicker
        : RangePicker) as PickerComponentClass<
        Omit<tGRDatePicker<tPickerType>, "pickerType">
      >,
    [pickerType]
  );

  const [date, setDate] = useState<Dayjs | null>();

  const _format = useMemo(() => {
    if (format) return format;
    if (picker !== "week") return;

    const weekOfMonth =
      Number(dayjs(date).format("w")) -
      Number(dayjs(date).startOf("M").format("w")) +
      1;
    return picker === "week"
      ? `${dayjs(date)
          .startOf("week")
          .format("YYYY-MM-DD")} (${weekOfMonth}주차)`
      : DEFAULT_DATE_FOMAT;
  }, [date, format, picker]);

  const onChangeDate = useCallback(
    (_date: Dayjs | null) => {
      setDate(_date);
      onChange?.(_date);
    },
    [onChange]
  );

  const renderExtraFooter = () => {
    if (picker !== "week") return;
    return (
      <GRFlexView
        alignItems={"center"}
        marginvertical={GRStylesConfig.BASE_MARGIN}
      >
        <GRButtonText
          buttonType={"default"}
          onClick={() => onChangeDate(dayjs())}
        >
          TODAY
        </GRButtonText>
      </GRFlexView>
    );
  };

  return (
    <BaseDatePicker
      locale={locale}
      css={css`
        width: ${width}rem;
        height: ${height}rem;
      `}
      format={_format}
      picker={picker}
      onChange={onChangeDate}
      renderExtraFooter={renderExtraFooter}
      disabledDate={(current: Dayjs) => {
        return current && current.valueOf() > Date.now();
      }}
      {...props}
    />
  );
};

export default GRDatePicker;
