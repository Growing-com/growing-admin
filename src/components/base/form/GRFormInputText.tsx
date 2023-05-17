import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Input } from 'antd'
import type { TextProps } from 'antd/es/typography/Text'
import React from 'react'
import { getMargin, tGetMargin } from 'utils'

interface GRFormInputText extends TextProps, tGetMargin{

}

const GRFormInputText = ({
  placeholder,
  onChange,
  ...props
}: GRFormInputText) => {
  const _margin = getMargin(props);

  return (
    <InputComponent
        {...props}
        placeholder={placeholder}
        onChange={onChange}
        css={css`
          ${_margin}
        `}
    />
  )
}

export default GRFormInputText;

const InputComponent = styled(Input)`
    display:flex;
    flex:1;
`
