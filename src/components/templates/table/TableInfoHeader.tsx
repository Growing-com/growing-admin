import GRText from "@component/atom/text/GRText"
import GRView from "@component/atom/view/GRView"
import { FC } from "react"
import { Color } from "styles/colors"

type tTableInfoHeader = { 
    title:string
    count?: string
    totalCount?: string
}

const TableInfoHeader: FC<tTableInfoHeader> = ({
    title,
    count,
    totalCount
}) => {
  return (
    <GRView>
        <GRText weight={"bold"}>{title} </GRText>
        <GRText color={Color.grey60}>
            <GRText weight={"bold"} color={Color.green200}>
            {count ?? 0} 명
            </GRText>
            <GRText marginhorizontal={"0.3"}>/</GRText>
            <GRText fontSize={"b8"} color={Color.grey80}>
            총 {totalCount ?? 0} 명
            </GRText>
        </GRText>
        </GRView>
  )
}

export default TableInfoHeader