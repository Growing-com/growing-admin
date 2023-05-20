import GRButton from '@component/base/button/GRButton'
import GRFlexView from '@component/base/view/GRFlexView'
import React from 'react'

const ExcelButton = () => {
  return (
    <GRFlexView marginRight={2} marginBottom={1} alignItems={"end"}>
        <GRButton>
            엑셀 다운로드
        </GRButton>
    </GRFlexView>
  )
}

export default ExcelButton