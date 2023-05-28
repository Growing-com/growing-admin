import { Radio, RadioGroupProps, RadioProps } from 'antd'
import React, { FC } from 'react'

export type tGRRadio = {

} & RadioGroupProps

const GRRadio: FC<tGRRadio> = ({
    options,
}) => {
  return (
    <Radio.Group 
        options={options}
    />
  )
}

export default GRRadio