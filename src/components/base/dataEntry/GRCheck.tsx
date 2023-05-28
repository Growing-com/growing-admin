import { Checkbox, CheckboxProps, Radio, RadioGroupProps, RadioProps } from 'antd'
import React, { FC } from 'react'

export type tGRCheck = {

} & CheckboxProps

const GRCheck: FC<tGRCheck> = ({
    options,
}) => {
  return (
    <Checkbox.Group
        options={options}
    />
  )
}

export default GRCheck