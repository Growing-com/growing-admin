import { css } from "@emotion/react";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, type FC } from "react";

const DEFAULT_FOMAT = "YYYY-MM-DD";

const GRDatePicker: FC<tGRDatePicker> = ({
  style,
  height,
  width,
  ...props
}) => {
  const _format = useCallback(
    (_date: Dayjs) => {
      if (props.format) return props.format;

      const weekOfMonth =
        Number(dayjs(_date).format("w")) -
        Number(dayjs(_date).startOf("M").format("w")) +
        1;
      return props.picker === "week"
        ? `${dayjs(_date).startOf("week").format("YYYY-MM")}-${weekOfMonth}주`
        : DEFAULT_FOMAT;
    },
    [props.format, props.picker]
  );

  return (
    <DatePicker
      css={css`
        width: ${width}rem;
        height: ${height}rem;
      `}
      format={_format}
      {...props}
    />
  );
};

export default GRDatePicker;
