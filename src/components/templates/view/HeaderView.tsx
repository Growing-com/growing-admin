import GRText from '@component/base/text/GRText'
import GRFlexView from '@component/base/view/GRFlexView'
import GRView from '@component/base/view/GRView'
import { Alert, Divider } from 'antd'
import React, { type FC, ReactNode } from 'react'
import { GRStylesConfig } from 'styles'

type tHeaderView = {
  title: string;
  headerComponent?: ReactNode;
  subComponent?: ReactNode;
  titleInfoType?:'success' | 'info' | 'warning' | 'error';
  titleInfo?: ReactNode;
}

const HeaderView: FC<tHeaderView> = ({
  title,
  headerComponent,
  subComponent,
  titleInfoType = "warning",
  titleInfo
}) => {
  return (
    <GRFlexView  borderRadius={0.5} padding={"1.3rem 2rem"} marginBottom={0.5} backgroundColor="white">
        <GRFlexView flexDirection={'row'} justifyContent={"space-between"}>
          <GRFlexView flexDirection={"row"}>
            <GRText fontSize={"h9"} weight={"bold"} marginRight={GRStylesConfig.BASE_MARGIN} >
              {title}
            </GRText>
            {titleInfo && 
              <Alert 
                showIcon 
                message={titleInfo}
                type={titleInfoType} 
                style={{ backgroundColor: "white" }}
                banner={true}
              />
            }
          </GRFlexView>
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

export default HeaderView
