import { FileExcelOutlined } from '@ant-design/icons'
import GRButtonText from '@component/base/button/GRTextButton'
import GRFlexView from '@component/base/view/GRFlexView'
import GRStylesConfig from 'styles/GRStylesConfig'

const ExcelButton = () => {
  return (
    // 그냥 아이콘만 보여줄지 아니면 이름도 같이 보여줄지 설정으로 
    <GRFlexView marginBottom={GRStylesConfig.BASE_MARGIN} alignItems={"end"}>
        <GRButtonText buttonType={"default"} >
            <FileExcelOutlined rev={undefined} style={{ fontSize:'1.3rem' }}/>
        </GRButtonText>
    </GRFlexView>
  )
}

export default ExcelButton