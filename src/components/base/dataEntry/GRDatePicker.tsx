import { css } from '@emotion/react'
import { DatePicker, DatePickerProps } from 'antd'
import React, { CSSProperties, type FC } from 'react'

type tGRDatePicker = {
  height?: CSSProperties['height'];
  width?: CSSProperties['width'];
} & DatePickerProps

const GRDatePicker: FC<tGRDatePicker> = ({
  style,
  height,
  width,
  ...props
}) => {
  return (
    <DatePicker
        css={css`
          width: ${width}rem;
          height: ${height}rem;
        `}
        {...props}
    />
  )
}

export default GRDatePicker