import GRText from '@component/base/text/GRText'
import GRFlexView from '@component/base/view/GRFlexView'
import GRView from '@component/base/view/GRView'
import { css } from '@emotion/react'
import { Alert, Divider } from 'antd'
import React, { type FC, ReactNode } from 'react'
import GRStylesConfig from 'styles/GRStylesConfig'

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
    <GRFlexView 
      borderRadius={0.5} 
      padding={"2rem 4rem"} 
      marginBottom={0.5} 
      backgroundColor="white"
      css={css`
        box-shadow: ${GRStylesConfig.BOX_SHOWDOW};
      `}
    >
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
            <Divider style={{ margin: "1rem 0rem 1rem 0rem" }}/>
            {subComponent}
          </React.Fragment>
        }
    </GRFlexView>
  )
}

export default HeaderView
