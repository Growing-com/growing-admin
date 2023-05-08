import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Input } from 'antd'
import type { TextProps } from 'antd/es/typography/Text'
import React from 'react'
import { getMargin, tGetMargin } from 'utils'

interface GRTextInput extends TextProps, tGetMargin{

}

const GRTextInput = ({
  placeholder,
  onChange,
  ...props
}: GRTextInput) => {
  const _margin = getMargin(props);

  return (
    <InputComponent
        placeholder={placeholder}
        onChange={onChange}
        css={css`
          ${_margin}
        `}
    />
  )
}

export default GRTextInput;

const InputComponent = styled(Input)`
    display:flex;
    flex:1;
`
