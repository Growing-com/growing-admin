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
  onChange,
  picker,
  ...props
}) => {
  const [date, setDate] = useState<Dayjs | null>();

  const _format = useMemo(() => {
    if (format) return format;
    if (picker !== "week") return;

    const weekOfMonth =
      Number(dayjs(date).format("w")) -
      Number(dayjs(date).startOf("M").format("w")) +
      1;
    return picker === "week"
      ? `${dayjs(date).startOf("week").format("YYYY-MM")}-${weekOfMonth}주`
      : DEFAULT_FOMAT;
  }, [date, format, picker]);

  // onChange?: (value: DateType | null, dateString: string) => void;
  const onChangeDate = useCallback(
    (_date: Dayjs | null) => {
      setDate(_date);
      onChange?.(_date);
    },
    [onChange]
  );

  return (
    <DatePicker
      value={date}
      css={css`
        width: ${width}rem;
        height: ${height}rem;
      `}
      format={_format}
      picker={picker}
      onChange={onChangeDate}
      {...props}
    />
  );
};

export default GRDatePicker;
