import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Input } from 'antd'
import type { TextProps } from 'antd/es/typography/Text'
import React from 'react'

interface GRTextInput extends TextProps{

}

const GRTextInput = ({
  placeholder,
  onChange,
}: GRTextInput) => {
  return (
    <InputComponent
        placeholder={placeholder}
        onChange={onChange}
    />
  )
}

export default GRTextInput;

const InputComponent = styled(Input)`
    display:flex;
    flex:1;
`
