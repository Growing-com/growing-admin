import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Input } from 'antd'
import React from 'react'

export default function GRTextInput({
    placeholder,
    onChange,
}) {
  return (
    <InputComponent
        placeholder={placeholder}
        onChange={onChange}
    />
  )
}

const InputComponent = styled(Input)`
    
`
