import React, { FC, ReactNode } from 'react'
interface IGRText {
  children: ReactNode;
}
const GRText: FC<IGRText> = ({
  children
}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default GRText