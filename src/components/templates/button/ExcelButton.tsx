import GRButton from '@component/base/button/GRButton'
import GRFlexView from '@component/base/view/GRFlexView'
import React from 'react'
import { GRStylesConfig } from 'styles'
import { Color } from 'styles/colors'
import { DownloadOutlined } from '@ant-design/icons'

const ExcelButton = () => {
  return (
    // 그냥 아이콘만 보여줄지 아니면 이름도 같이 보여줄지 설정으로 
    <GRFlexView marginBottom={GRStylesConfig.BASE_MARGIN} alignItems={"end"}>
        <GRButton backgroundColor={Color.white} type={"custom"} >
            <DownloadOutlined rev={undefined} />
            엑셀 다운
        </GRButton>
    </GRFlexView>
  )
}

export default ExcelButton