import { css } from "@emotion/react"
import { FC } from "react"

type tGRDot = {
    size?: number
    marginRight?: number
    backgroundColor?: string
}

const GRDot: FC<tGRDot> = ({
    size = 4,
    marginRight,
    backgroundColor = "red"
}) => {
  return (
    <span 
        css={css`
            height: ${size}px;
            width: ${size}px;
            background-color: ${backgroundColor};
            border-radius: 50%;
            display: inline-block;
            margin-right: ${ marginRight || 0.5}rem
        `
    }/>
  )
}

export default GRDot;
