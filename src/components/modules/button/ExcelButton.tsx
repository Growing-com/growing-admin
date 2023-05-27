import GRButton from '@component/base/button/GRButton'
import GRFlexView from '@component/base/view/GRFlexView'
import React from 'react'
import GRStylesConfig from 'styles/GRStylesConfig'
import { Color } from 'styles/colors'
import { FileExcelOutlined } from '@ant-design/icons'

const ExcelButton = () => {
  return (
    // 그냥 아이콘만 보여줄지 아니면 이름도 같이 보여줄지 설정으로 
    <GRFlexView marginBottom={GRStylesConfig.BASE_MARGIN} alignItems={"end"}>
        <GRButton type={"default"} >
            <FileExcelOutlined rev={undefined} style={{ fontSize:'1.3rem' }}/>
        </GRButton>
    </GRFlexView>
  )
}

export default ExcelButton