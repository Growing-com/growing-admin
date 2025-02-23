import { css } from "@emotion/react"
import { FC } from "react"

type tGRDot = {
    size?: number
}

const GRDot: FC<tGRDot> = ({
    size = 4
}) => {
  return (
    <span 
        css={css`
            height: ${size}px;
            width: ${size}px;
            background-color: red;
            border-radius: 50%;
            display: inline-block;
            margin-right: 0.5rem
        `
    }/>
  )
}

export default GRDot;
