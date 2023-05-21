import GRButton from '@component/base/button/GRButton'
import GRFlexView from '@component/base/view/GRFlexView'
import React from 'react'
import { GRStylesConfig } from 'styles'

const ExcelButton = () => {
  return (
    // 그냥 아이콘만 보여줄지 아니면 이름도 같이 보여줄지 설정으로 
    <GRFlexView marginRight={2} marginBottom={GRStylesConfig.BASE_MARGIN} alignItems={"end"}>
        <GRButton>
            엑셀 다운로드
        </GRButton>
    </GRFlexView>
  )
}

export default ExcelButton