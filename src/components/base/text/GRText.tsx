import { SerializedStyles, css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react'
import type { CSSProperties, FC, ReactNode } from 'react'
import { getMargin, tGetMargin } from 'utils';

type tFontSizeType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8" | "h9" | "b1" | "b2" | "b3" | "b4" | "b5";

type tGRTextSpan = {
  color?: CSSProperties['color'];
  weight?: CSSProperties['fontWeight'];
  margin?: CSSProperties['margin'];
}

type GRTextProps = {
  textAlign?: CSSProperties['textAlign'];
  display?: CSSProperties['display'];
  weight?: CSSProperties['fontWeight']; 
  fontSize?: tFontSizeType;
} & JSX.IntrinsicElements["span"] & tGetMargin

const GRText: FC<GRTextProps> = ({
  children,
  weight,
  display = 'inline-block',
  textAlign,
  color,
  style,
  fontSize,
  ...rest
}) => {
  const _margin = getMargin(rest)
  return (
    <TextComponent
      color={color}
      weight={weight}
      css={css`
        ${TEXT_SIZE[fontSize]}
        display: ${display};
        ${_margin};
      `}
      style={{
        textAlign,
        ...style,
      }}
    >
      {children}
    </TextComponent>
  )
}

export default GRText

const TextComponent = styled.span<tGRTextSpan>`
  color: ${p => p?.color ?? "#222222"};
  font-weight: ${p => p?.weight ?? "normal"};
  margin: ${p => p?.margin ?? ""};
`

const TEXT_SIZE: Record<tFontSizeType, SerializedStyles> = {
    h1: css`
        font-size: 3rem;
        line-height: 4.2rem;
        letter-spacing: -0.03rem;
    `,
    h2: css`
        font-size: 2.8rem;
        line-height: 3.9rem;
        letter-spacing: -0.03rem;
    `,
    h3: css`
        font-size: 2.4rem;
        line-height: 3.4rem;
        letter-spacing: -0.03rem;
    `,
    h4: css`
        font-size: 2.2rem;
        line-height: 3.1rem;
        letter-spacing: -0.02rem;
    `,
    h5: css`
        font-size: 2rem;
        line-height: 2.8rem;
        letter-spacing: -0.02rem;
    `,
    h6: css`
        font-size: 1.8rem;
        line-height: 2.5rem;
        letter-spacing: -0.02rem;
    `,
    h7: css`
        font-size: 1.7rem;
        line-height: 2.4rem;
        letter-spacing: -0.01rem;
    `,
    h8: css`
        font-size: 1.6rem;
        line-height: 2.2rem;
        letter-spacing: -0.01rem;
    `,
    h9: css`
        font-size: 1.5rem;
        line-height: 2.1rem;
        letter-spacing: -0.01rem;
    `,
    b1: css`
        font-size: 1.4rem;
        line-height: 2rem;
        letter-spacing: -0.01rem;
    `,
    b2: css`
        font-size: 1.3rem;
        line-height: 1.9rem;
        letter-spacing: -0.01rem;
    `,
    b3: css`
        font-size: 1.2rem;
        line-height: 1.8rem;
        letter-spacing: -0.01rem;
    `,
    b4: css`
        font-size: 1.1rem;
        line-height: 1.6rem;
        letter-spacing: -0.01rem;
    `,
    b5: css`
        font-size: 1rem;
        line-height: 1.4rem;
        letter-spacing: -0.01rem;
    `
};