import { css } from "@emotion/react";
import { DatePicker, type DatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { CSSProperties, useCallback, useMemo, useState, type FC } from "react";

const DEFAULT_FOMAT = "YYYY-MM-DD";

type tGRDatePicker = {
  height?: CSSProperties["height"];
  width?: CSSProperties["width"];
} & DatePickerProps;

const GRDatePicker: FC<tGRDatePicker> = ({
  style,
  height,
  width,
  format,
  ...props
}) => {
  const [date, setDate] = useState<Dayjs | null>();

  const _format = useMemo(() => {
    if (format) return format;

    const weekOfMonth =
      Number(dayjs(date).format("w")) -
      Number(dayjs(date).startOf("M").format("w")) +
      1;
    return props.picker === "week"
      ? `${dayjs(date).startOf("week").format("YYYY-MM")}-${weekOfMonth}주`
      : DEFAULT_FOMAT;
  }, [date, format, props.picker]);

  // onChange?: (value: DateType | null, dateString: string) => void;
  const onChangeDate = useCallback((_date: Dayjs | null) => {
    setDate(_date);
  }, []);

  return (
    <DatePicker
      value={date}
      css={css`
        width: ${width}rem;
        height: ${height}rem;
      `}
      format={_format}
      onChange={onChangeDate}
      {...props}
    />
  );
};

export default GRDatePicker;
