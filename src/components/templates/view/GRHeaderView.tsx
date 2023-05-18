import GRText from '@component/base/text/GRText'
import GRFlexView from '@component/base/view/GRFlexView'
import { Divider } from 'antd'
import React, { type FC, ReactNode } from 'react'

type tGRHeaderView = {
  title: string;
  headerComponent?: ReactNode;
  subComponent?: ReactNode;
}

const GRHeaderView: FC<tGRHeaderView> = ({
  title,
  headerComponent,
  subComponent
}) => {
  return (
    <GRFlexView  borderRadius={0.5} padding={"1.3rem 2rem"} marginBottom={0.5} backgroundColor="white">
        <GRFlexView flexDirection={'row'} justifyContent={"space-between"}>
            <GRText fontSize={"h9"} weight={"bold"}>
              {title}
            </GRText>
            {headerComponent}
        </GRFlexView>
        {subComponent &&
          <React.Fragment>
            <Divider style={{ margin: "1rem 1rem" }}/>
            {subComponent}
          </React.Fragment>
        }
    </GRFlexView>
  )
}

export default GRHeaderView
